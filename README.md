# Remixjobs

> Unofficial Remixjobs API

## Introduction

Scrapping et API dans le fichier server.js

1. Lancer mongod et mongo (remixjobsdb)
2. Lancer node (node server.js)
3. Scrapper (voir rubrique Scrape) 
4. Consulter les resultats sur postman via l'API (voir rubrique API)

## Scrape

Pour scrapper sur remixjobs utiliser : http://localhost:8080/scrape

## API

* /jobs POST pour creer un nouveau jobs
* /jobs GET pour afficher tout les jobs scrappés
* /jobs/:id_job GET pour afficher un job par ID
* /jobs/:id_job PUT pour modifier un job par ID

Pour les POST, les informations sont à mettre dans Body en respectant le schéma job
    title: String,
	company: String,
	localization: String,
	category: String,
	description: String,
	contract: String,
	date: String,
	tags: [String]
