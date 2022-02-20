// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import Livre from './Livre';

// Classe
class Galerie extends React.Component{

	// Render
	render(){
		if (this.props.henriStore.galerieChargee){
			if (this.props.henriStore.livresDOM.length > 0){
				return(
					<div className="galerie">
						{
							this.props.henriStore.livresDOM.map((livre, index) => {
								return <Livre key={ livre.isbn } livre={ livre }/>
							})
						}
					</div>
				)
			} else {
				return(
					<div className="noResults">
						<p>Désolé, aucun livre ne corresponds à votre recherche.</p>
					</div>
				)
			}
		} else {
			return null;
		}
	};

};

// Export
export default inject('henriStore')(observer(Galerie));