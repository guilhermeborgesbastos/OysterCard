/*
 * index.php
 *
 * London’s Oyster card system ( Use case )
 * @version    0.1.0
 * @author     Guilherme Borges Bastos
 * @copyright  Copyright 2017 Guilherme Borges Bastos
 * @LinkedIn   https://www.linkedin.com/in/guilhermeborgesbastos/
 * @date       15/11/2017
*/
'use strict';

const OysterCard = require('./OysterCard.class.js');

// Instantiate User:
let card = new OysterCard();

// Card charged with £30
card.setCredit(30);

// enter in the subway
card.enterStation(OysterCard.STATIONS.Holborn);
// set new trip from Tube Holborn to Earl’s Court
card.setNewJourney(OysterCard.STATIONS.EarlsCourt);
// exit station
card.exitStation();

// set bus trip from 328 bus from Earl’s Court to Chelsea
card.setNewBusJourney();

// enter in the subway
card.enterStation(OysterCard.STATIONS.EarlsCourt);
// set new trip
card.setNewJourney(OysterCard.STATIONS.Hammersmith);
// exit station
card.exitStation();