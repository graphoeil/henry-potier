// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import panier from '../svg/shopping-basket-light.svg';

// Classe
class BoutonPanier extends React.Component{

	// Render
	render(){
		return(
			<div className="btnPanier" onClick={ this.props.henriStore.showPanier }>
				<div className="innerBtnPanier">
					<span>{ this.props.henriStore.panier.length }</span>
					<img src={ panier } alt="Un panier" />
				</div>
			</div>
		)
	};

};

// Export
export default inject('henriStore')(observer(BoutonPanier));