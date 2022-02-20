// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import PanierArticle from './PanierArticle';
import croix from '../svg/times-light.svg';
import $ from 'jquery';

// Variables
const gsap = window.gsap;

// Classe
class Panier extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.panierRef = React.createRef();
	}

	// Render
	render(){

		// Remise
		const remise = () => {
			return (this.props.henriStore.totalPanier - this.props.henriStore.totalAvecRemise).toFixed(2);
		};

		// Return
		return(
			<div className="panier" ref={ this.panierRef }>
				<div className="innerPanier">
					<div className="btnFermePanier" onClick={ this.fermePanier.bind(this) }>
						<div className="innerFermePanier">
							<img src={ croix } alt="une croix" />
						</div>
					</div>
					<h3>Mon panier</h3>
					<div className="panierDetail">
						{
							this.props.henriStore.panier.length > 0
							? this.props.henriStore.panier.map((livre, index) => {
								return <PanierArticle key={ livre.isbn } livre={ livre } callback={ this.handleRetrait.bind(this) }/>
							})
							: <div className="panierVide">Votre panier est vide.</div>
						}
					</div>
					{
						this.props.henriStore.panier.length > 0 && <div className="recapitulatifPanier">
							<div className="totalPanier">Total avant remise : <span>{ this.props.henriStore.totalPanier.toFixed(2) }€</span></div>
							<div className="remisePanier">Offre spéciale : <span>{ remise() }€</span></div>
							<div className="grandTotal">Total après remise : <span>{ this.props.henriStore.totalAvecRemise.toFixed(2) }€</span></div>
						</div>
					}
				</div>
			</div>
		)
	};

	// Fermeture du panier
	fermePanier(){
		const $panier = $(this.panierRef.current);
		gsap.to($panier,{ right:-300, ease:'power1.out', duration:0.5, onComplete:() => {
			this.props.henriStore.hidePanier();
		}});
	};

	// Retrait du panier
	handleRetrait(livre){
		this.props.henriStore.retraitPanier(livre);
	};

	// Affichage du panier
	componentDidMount(){
		const $panier = $(this.panierRef.current);
		gsap.to($panier,{ right:0, ease:'power1.out', duration:0.5 });
	};

};

// Export
export default inject('henriStore')(observer(Panier));