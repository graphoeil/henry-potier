// Imports
import { makeObservable, observable, action, runInAction } from 'mobx';
import $ from 'jquery';

// Variables
const URL_FLUX = 'https://henri-potier.techx.fr/books';
const END_POINT = 'commercialOffers'

// Classe
class HenriStore{

	// Constructeur
	constructor(){
		// Variables observables
		makeObservable(this,{
			// Galerie
			livres:observable,
			livresDOM:observable,
			galerieChargee:observable,
			// Panier
			panier:observable,
			panierVisible:observable,
			totalPanier:observable,
			totalAvecRemise:observable,
			// Page
			pageVisible:observable,
			pageActive:observable,
			// Footer
			footerVisible:observable
		});
		// Chargement des données initial
		this.chargeDonnees();
	};

	// Variables
	//
	// Galerie
	livres = [];
	livresDOM = [];
	livreEnCours = 0;
	nombreDeLivres = 0;
	galerieChargee = false;
	// Panier
	panier = [];
	panierVisible = false;
	totalPanier = 0;
	totalAvecRemise = 0;
	// Page
	pageActive = {};
	pageVisible = false;
	// Footer
	footerVisible = false;

	// Méthodes
	//
	// Init
	chargeDonnees = action(() => {
		$.getJSON(URL_FLUX).done((data) => {
			runInAction(() => {
				this.livres = data;
				this.livresDOM = data.slice(0,1);
				this.livreEnCours = 0;
				this.nombreDeLivres = data.length;
				this.galerieChargee = true;
			});
		}).fail((error) => {
			console.log('Erreur durant le chargement des données => ' + error);
		});
	});
	// Galerie
	afficheLivreSuivant = action(() => {
		if (this.livreEnCours < this.nombreDeLivres - 1){
			this.livreEnCours++;
			this.livresDOM.push(this.livres[this.livreEnCours]);
		}
		if (this.livreEnCours === this.nombreDeLivres - 1){
			this.footerVisible = true;
		}
	});
	// Panier
	showPanier = action(() => {
		this.panierVisible = true;
	});
	hidePanier = action(() => {
		this.panierVisible = false;
	});
	ajoutPanier = action((livre) => {
		this.panier.push(livre);
		// Total panier
		this.totalPanier = this.panier.reduce((prev, livre) => (prev + livre.price),0);
		this.checkRemisePanier();
	});
	retraitPanier = action((livre) => {
		this.panier = this.panier.filter(l => l.isbn !== livre.isbn);
		// Total panier
		this.totalPanier = this.panier.reduce((prev, livre) => (prev + livre.price),0);
		this.checkRemisePanier();
	});
	checkRemisePanier = action(() => {
		let isbnPanier = '';
		if (this.panier.length > 0){
			this.panier.forEach((livre, index) => {
				isbnPanier += livre.isbn + ',';
			});
			$.getJSON(`${URL_FLUX}/${isbnPanier}/${END_POINT}`).done((data) => {
				runInAction(() => {
					let totalPercentage = 0;
					let totalMinus = 0;
					let totalSlice = 0;
					const meilleurPrix = [];
					data.offers.forEach((offer, index) => {
						switch (offer.type){
							case 'percentage':
								totalPercentage = this.totalPanier * (100-offer.value) / 100;
								meilleurPrix.push(totalPercentage);
								break;
							case 'minus':
								totalMinus = this.totalPanier - offer.value;
								meilleurPrix.push(totalMinus);
								break;
							case 'slice':
								totalSlice = this.totalPanier - offer.value;
								meilleurPrix.push(totalSlice);
								break;
							default: break;
						}
					});
					meilleurPrix.sort((a, b) => { return a - b; });
					this.totalAvecRemise = meilleurPrix[0];
				});
			}).fail((error) => {
				console.log('Erreur durant le chargement des données => ' + error);
			});
		}
	});
	// Page
	setPageActive = action((livre) => {
		this.pageActive = livre;
		this.pageVisible = true;
	});
	hidePageVisible = action(() => {
		this.pageVisible = false;
	});
	// Recherche
	lancheRecherche = action((recherche) => {
		this.livresDOM = this.livres.filter((livre) => {
			return livre.title.toLowerCase().includes(recherche.toLowerCase()) === true;
		});
	});
	resetRecherche = action(()  => {
		this.livresDOM = this.livres;
	});

};

// Export
export default HenriStore;