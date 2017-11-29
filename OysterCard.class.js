/*
 * OysterCard.class.js
 *
 * Class to manage the Oyster Card
 *
 * @version    0.1.0
 * @author     Guilherme Borges Bastos
 * @copyright  Copyright 2017 Guilherme Borges Bastos
 * @date       15/11/2017
*/

"use strict";

// const variables
const BUS_COST = 1.8,
      MAX_COST = 3.2,
      COST_ONLY_ZONE_ONE = 2.5,
      COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE = 2.0,
      COST_TWO_ZONES_INCLUDING_ZONE_ONE = 3.0,
      COST_TWO_ZONES_EXCLUDING_ZONE_ONE = 2.25;

const STATIONS = {
    Holborn: [1],
    EarlsCourt: [1, 2],
    Hammersmith: [2],
    Wimbledon: [3]
};


class OysterCard {

    constructor (credit = 0) {
        this.credit = credit;
        this.fare = 0;
        this.points = [];
    }

    /**
     * Sets Credit in the Card
     * @param  float  amount
    */
    setCredit(amount) {
        if (typeof(amount) === 'number') {
            this.credit += amount;
        } else {
            return 0;
        }
        return this.credit;
    }

    /**
     * Reads Credit from the Card
    */
    getCredit() {
        return this.credit;
    }
    
    /*
     * Sets Debit in the Card
    */
    setDebit() {
        (this.credit >= this.fare ? this.credit -= this.fare : process.exit(console.log('Not enough credit!')));
    }

    /**
     * When the user passes through the inward barrier at the station, their oyster card is charged the maximum fare
    */
    enterStation(station) {
        // console.log("## Entering in the Subway Station...");
        if(typeof station === `object`) {
            this.points.push(station);            
            this.fare = MAX_COST;
            this.setDebit();
        } else {
            process.exit(console.log('Invalid Station!'))
        }
    }

    /**
     * When they pass out of the barrier at the exit station, the fare is calculated
     * The maximum fare transaction removed and replaced with the real transaction
    */
    exitStation() {
        // Refund of the maximum transport rate
        // console.log("# Exiting from the Subway Station...");
        this.getFinalCost();
        this.setDebit();
        // console.log(`Remaining balance of £${this.getCredit().toFixed(2)}\n`);
    }
   
    /**
     * Method used to keep the station of departure and the arriving station
    */
    setNewJourney(finalStation) {
        // console.log(`New Tube Jurney from zone(s) ${pointA} to zone(s) ${pointB}`);
        this.points.push(finalStation);
    }

    /**
     * Method used to account a new bus trip
    */
    setNewBusJourney() {  
        // console.log(`## New Bus Jurney\nFare of £${BUS_COST.toFixed(2)}\n`);
        this.fare = BUS_COST;  
        this.setDebit();
        // console.log(`Remaining balance of £${this.getCredit().toFixed(2)}\n`);
    }

    /**
     * Method that calculates the real transaction amount that will be charged according to the journey's stations
    */
    getFinalCost() {
        // if there is just one station, charge the MAX_COST because tehre isn't the Enter Station
        if (this.points.length == 2) {
            //return the MAX_COST
            this.setCredit(MAX_COST);

            // calculate the final cost ( real const )
            var zonesCrossed = this.getZonesCrossed(this.points[0], this.points[1]);
            var isZoneOneCrossed = this.didCrossedZoneOne(this.points[0], this.points[1]);
            var cost = this.getCostByZone(zonesCrossed, isZoneOneCrossed);
            this.fare = cost;
        } else {
            this.fare = MAX_COST;
        }

        // console.log(`Fare of £${cost.toFixed(2)}\n`);
    }

    /**
     * Select the correct cost according to zones of the trip
     * @param  Array  $zonesCrossed
     * @param  Boolean  $isZoneOneCrossed
    */
    getCostByZone(zonesCrossed, isZoneOneCrossed) {
        if(zonesCrossed == 1 && isZoneOneCrossed) { return COST_ONLY_ZONE_ONE; }
        if(zonesCrossed == 1 && !isZoneOneCrossed) { return COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE; }
        if(zonesCrossed == 2 && isZoneOneCrossed) { return COST_TWO_ZONES_INCLUDING_ZONE_ONE; }
        if(zonesCrossed == 2 && !isZoneOneCrossed) { return COST_TWO_ZONES_EXCLUDING_ZONE_ONE; }
        if(zonesCrossed == 3) { return MAX_COST; }
        return MAX_COST;
    }

    /**
     * Method that calculates the number of Zones Crossed according to two points
     * @param  Array  from
     * @param  Array  to
    */
    getZonesCrossed(from, to) {
        var minZonesVisited = 10;
        from.forEach(function(fromZone, index, array){
            to.forEach(function(toZone, index, array){
                var zonesVisited = Math.abs(fromZone - toZone) + 1;
                if(zonesVisited < minZonesVisited) {
                    minZonesVisited = zonesVisited;
                }
                if(minZonesVisited == 1) {
                    return;
                }
            });
        });
        return minZonesVisited;
    }

    /**
     * Method to verify if element exists in array
     * @param  int    needle
     * @param  Array  haystack
    */
    in_array(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }

    /**
     * Method that verify if the range of stations cross over the zone one
     * @param  Array  from
     * @param  Array  to
    */
    didCrossedZoneOne(from, to) {
        return (from.length == 1 && this.in_array(1, from)) || (to.length == 1 && this.in_array(1, to));
    }

}

Object.defineProperty(OysterCard, 'STATIONS', {
  value: STATIONS,
  writable: false // makes the property read-only
});

module.exports = OysterCard;