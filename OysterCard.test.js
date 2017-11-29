/*
 * OysterCards.test.php
 *
 * Test Driven Development Class of OysterCard
 * @version    0.1.0
 * @author     Guilherme Borges Bastos
 * @copyright  Copyright 2017 Guilherme Borges Bastos
 * @LinkedIn   https://www.linkedin.com/in/guilhermeborgesbastos/
 * 
*/
const OysterCard = require('./OysterCard.class');
let card = new OysterCard();

// ######################################
// #### tests method getCostByZone() ####
// ######################################
test('returns 2.5 of fare for a trip between 1 zones crossing zone 1', () => {
  expect(card.getCostByZone(1, true)).toBe(2.5);
});

test('returns 3 of fare for a trip between 2 zones crossing zone 1', () => {
  expect(card.getCostByZone(2, true)).toBe(3);
});

test('returns 3.2 of fare for a trip between 3 zones crossing zone 1', () => {
  expect(card.getCostByZone(3, true)).toBe(3.2);
});

test('returns 2 of fare for a trip between 1 zone NOT crossing zone 1', () => {
  expect(card.getCostByZone(1, false)).toBe(2);
});

test('returns 2.25 of fare for a trip between 2 zones NOT crossing zone 1', () => {
  expect(card.getCostByZone(2, false)).toBe(2.25);
});

test('returns 3.2 of fare for a trip between 3 zones NOT crossing zone 1', () => {
  expect(card.getCostByZone(3, false)).toBe(3.2);
});

// ####################################
// ####  tests method setCredit() #####
// ####################################
test('returns 0 for empty string', () => {
  expect(card.setCredit("")).toBe(0);
});

test('returns 10 for integer 10', () => {
  expect(card.setCredit(10)).toBe(10);
});

test('returns 0 for a negative number', () => {
  expect(card.setCredit(-10)).toBe(0);
});

test('returns 30.5 for a float number', () => {
  expect(card.setCredit(30.5)).toBe(30.5);
});

// #########################################
// ####  test if user hump the station #####
// #########################################
test("didn't swipe the card previously and exit the station", () => {
	var card = new OysterCard(30);
	card.setNewJourney(OysterCard.STATIONS.EarlsCourt);
	card.exitStation();
	expect(card.getCredit()).toBe(26.8); // It will charge MAX_COST
});