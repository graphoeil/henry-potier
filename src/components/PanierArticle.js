// Imports
import React from 'react';
import poubelle from '../svg/trash-light.svg';
import $ from 'jquery';

// Variables
const gsap = window.gsap;

// Classe
class PanierArticle extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.poubelleRef = React.createRef();
	};

	// Render
	render(){
		
		// Variables
		const { livre } = this.props;

		// Return
		return(
			<div className="panierArticle">
				<div className="prixPanier">{ livre.price }€</div>
				<div className="couverturePanier">
					<img src={ livre.cover } alt={ livre.title } />
				</div>
				<div className="btnPoubellePanier" onClick={ this.handleClick.bind(this,livre) } ref={ this.poubelleRef }>
					<div className="innerBouton">
						<img src={ poubelle } alt="une poubelle" />
					</div>
				</div>
			</div>
		)

	};

	// Livre à la poubelle
	handleClick(livre){
		const $poubelle = $(this.poubelleRef.current);
		gsap.to($poubelle,{ duration:0.3, scale:0.7, ease:'bounce.out', repeat:1, yoyo:true, onComplete:() => {
			this.props.callback(livre);
		}});
	};


};

// Export
export default PanierArticle;