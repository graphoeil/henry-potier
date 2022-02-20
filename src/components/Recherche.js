// Imports
import React from 'react';
import { inject } from 'mobx-react';
import * as classNames from 'classnames';
import loupe from '../svg/search-light.svg';

// Classe
class Recherche extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.state = { recherche:'', rechercheVisible:false };
		this.inputRef = React.createRef();
	};

	// Render
	render(){

		// Classe
		const rechercheClass = classNames({
			'recherche':true,
			'ouverte':this.state.rechercheVisible
		});

		// Return
		return(
			<div className={ rechercheClass }>
				<div className="champRecherche">
					<input type="text" id="recherche" name="reherche" placeholder="Cherchez phénix" ref={ this.inputRef } 
						value={ this.state.recherche } onChange={ this.handleChange.bind(this) } />
				</div>
				<div className="btnLoupe" onClick={ this.toggleRecherche.bind(this) }>
					<div className="innerLoupe">
						<img src={ loupe } alt="une loupe" />
					</div>
				</div>
			</div>
		)

	};

	// MAJ du state recherche et envoi requête
	handleChange(e){
		e.persist();
		let timerRecherche;
		this.setState({ recherche:e.target.value }, () => {
			if (timerRecherche){ clearTimeout(timerRecherche); }
			setTimeout(() => {
				if (e.target.value === ''){
					this.props.henriStore.resetRecherche();
				} else {
					this.props.henriStore.lancheRecherche(e.target.value);
				}
			},200);
		});
	};

	// Affichage / masquage de la recherche
	toggleRecherche(){
		this.setState({ rechercheVisible:!this.state.rechercheVisible }, () => {
			if (this.state.rechercheVisible){
				this.inputRef.current.focus();
			} else {
				this.setState({ recherche:'' });
				this.props.henriStore.resetRecherche();
			}
		});
	};

};

// Export
export default inject('henriStore')(Recherche);