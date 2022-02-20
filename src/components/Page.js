// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import poubelle from '../svg/trash-light.svg';
import panier from '../svg/shopping-basket-light.svg';
import croix from '../svg/times-light-jaune.svg';

// Variables
const gsap = window.gsap;

// Classe
class Page extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.pageRef = React.createRef();
		this.poubelleRef = React.createRef();
		this.panierRef = React.createRef();
		this.scrollPos = 0;
	};

	// Render
	render(){

		// Variables
		const page = this.props.henriStore.pageActive;

		// Dans le panier
		const dansLePanier = () => {
			let dedans = false;
			this.props.henriStore.panier.forEach((livre, index) => {
				if (livre.isbn === page.isbn){
					dedans = true;
				};
			});
			return dedans;
		};

		// Return
		return(
			<div className="page" ref={ this.pageRef }>
				<div className="btnFermePage" onClick={ this.handleFermePage.bind(this) }>
					<div className="innerFermePage">
						<img src={ croix } alt="une croix" />
					</div>
				</div>
				<div className="innerPage">
					<div className="couverturePage">
						<div className="couvertureImg">
							<img src={ page.cover } alt={ page.title } />
						</div>
						<div className="boutonsLivre">
							{
								dansLePanier()
								? <div className="btnPoubelleLivre" onClick={ this.handleClick.bind(this,'retrait',page) } ref={ this.poubelleRef }>
									<div className="innerBouton">
										<img src={ poubelle } alt="une poubelle" />
									</div>
								</div>
								: <div className="btnPanierLivre" onClick={ this.handleClick.bind(this,'ajout',page) } ref={ this.panierRef }>
									<div className="innerBouton">
										<img src={ panier } alt="un panier" />
									</div>
								</div>
							}
						</div>
					</div>
					<div className="textePage">{ page.synopsis }</div>
					<div className="prixISBN">
						<span><b>Prix :</b> { page.price }€</span>
						<span><b>ISBN-8 :</b> { page.isbn.slice(0,8).toUpperCase() }</span>
					</div>
				</div>
			</div>
		)
	};

	// Referme la page
	handleFermePage(){
		const $page = $(this.pageRef.current);
		$page.fadeOut(1000, function(){
			this.props.henriStore.hidePageVisible();
		}.bind(this));
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
		}
	};

	// La page est visible
	componentDidMount(){
		const $page = $(this.pageRef.current);
		$page.fadeIn('slow');
	};

};

// Export
export default inject('henriStore')(observer(Page));