// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';
import $ from 'jquery';
import poubelle from '../svg/trash-light.svg';
import panier from '../svg/shopping-basket-light.svg';
import livre from '../svg/book-light.svg';

// Variables
const gsap = window.gsap;

// Classe
class Livre extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.state = { isVisible:false };
		this.poubelleRef = React.createRef();
		this.panierRef = React.createRef();
		this.detailRef = React.createRef();
	};

	// Render
	render(){

		// Classe
		const livreClass = classNames({
			'livre':true,
			'visible':this.state.isVisible
		});

		// Dans le panier
		const dansLePanier = () => {
			let dedans = false;
			this.props.henriStore.panier.forEach((livre, index) => {
				if (livre.isbn === this.props.livre.isbn){
					dedans = true;
				};
			});
			return dedans;
		};

		// Return
		return(
			<div className={ livreClass }>
				<div className="couvertureLivre">
					<img onLoad={ this.handleLoad.bind(this) } src={ this.props.livre.cover } alt={ this.props.livre.title } />
				</div>
				<div className="boutonsLivre">
					{
						dansLePanier()
						? <div className="btnPoubelleLivre" onClick={ this.handleClick.bind(this,'retrait',this.props.livre) } ref={ this.poubelleRef }>
							<div className="innerBouton">
								<img src={ poubelle } alt="une poubelle" />
							</div>
						</div>
						: <div className="btnPanierLivre" onClick={ this.handleClick.bind(this,'ajout',this.props.livre) } ref={ this.panierRef }>
							<div className="innerBouton">
								<img src={ panier } alt="un panier" />
							</div>
						</div>
					}
					<div className="btnDetailLivre" onClick={ this.handleClick.bind(this,'detail',this.props.livre) } ref={ this.detailRef }>
						<div className="innerBouton">
							<img src={ livre } alt="un livre" />
						</div>
					</div>
				</div>
			</div>
		)

	};

	// Image chargée, livre suivant
	handleLoad(){
		this.setState({ isVisible:true }, () => {
			this.props.henriStore.afficheLivreSuivant();
		});
	};

	// Click sur les boutons
	handleClick(action, livre){
		if (action === 'retrait'){
			this.props.henriStore.retraitPanier(livre);
			const $poubelle = $(this.poubelleRef.current);
			gsap.to($poubelle,{ duration:0.3, scale:0.7, ease:'bounce.out', repeat:1, yoyo:true });
		} else if (action === 'ajout'){
			this.props.henriStore.ajoutPanier(livre);
			const $panier = $(this.panierRef.current);
			gsap.to($panier,{ duration:0.3, scale:1.3, ease:'bounce.out', repeat:1, yoyo:true });
		} else if (action === 'detail'){
			const $detail = $(this.detailRef.current);
			gsap.to($detail,{ duration:0.3, scale:1.3, ease:'bounce.out', repeat:1, yoyo:true, onComplete: () => {
				this.props.henriStore.setPageActive(livre);
			} });
		}
	};

};

// Export
export default inject('henriStore')(observer(Livre));