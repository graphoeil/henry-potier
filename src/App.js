// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import './css/displayMain.css';
import Recherche from './components/Recherche';
import BoutonPanier from './components/BoutonPanier';
import Galerie from './components/Galerie';
import Page from './components/Page';
import Panier from './components/Panier';
import Footer from './components/Footer';

// Classe
class App extends React.Component{
	
	// Render
	render(){
		return(
			<React.Fragment>

				{/* Recherche */}
				<Recherche/>
				{/* Recherche */}

				{/* Bouton panier */}
				<BoutonPanier/>
				{/* Bouton panier */}

				{/* Titre */}
				<div className="titre">
					<h1>La bibliothèque d'Henri Potier</h1>
				</div>
				{/* Titre */}

				{/* Galerie */}
				<Galerie/>
				{/* Galerie */}

				{/* Page */}
				{
					this.props.henriStore.pageVisible && <Page/>
				}
				{/* Page */}

				{/* Panier */}
				{
					this.props.henriStore.panierVisible && <Panier/>
				}
				{/* Panier */}

				{/* Footer */}
				{
					(this.props.henriStore.footerVisible && this.props.henriStore.livresDOM.length > 0) && <Footer/>
				}
				{/* Footer */}

			</React.Fragment>
		)
	};

};

// Export
export default inject('henriStore')(observer(App));