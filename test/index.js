//Mocha est le framework de test unitaire le plus célèbre de Nodejs fournissant de nombreux outils et apis 
//(cycle de vie des tests, reporting des tests de coverage, reporting concernant la durée des tests, choix libre de la librairie d'assertion...):
//cf. doc apis: https://mochajs.org
//Chai est la librairie, l'outil d'assertion la plus complète (plus complète que le module natif Assert de nodejs (cf. https://nodejs.org/api/assert.html)):
//cf. doc apis: http://chaijs.com/api/
//Mocha et chai peuvent aussi fonctionner côté navigateur: pour initialiser un projet de test côté browser, il suffit de l'initialiser via: mocha init nomProjet

//Bonne documentation unit test dans node.js: http://fredkschott.com/post/2014/05/nodejs-testing-essentials/
//cf. mocha, chai en ES2015: https://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/

import {
	assert
} from "chai";

//L'api mocha "describe"" permet de décrire une suite de test (c'est un container de tests pouvant contenir d'autres describe en son sein):
describe('Array', function() {
	//Hooks (api mocha):
	before(function() {
		// runs before all tests in this block
	});

	after(function() {
		// runs after all tests in this block
	});

	beforeEach(function() {
		// runs before each test in this block
	});

	afterEach(function() {
		// runs after each test in this block
	});

	//Test cases:
	describe('#indexOf()', function() {
		//L'api mocha "it" correspond à un jeu de test:
		it('should return -1 when the value is not present', function() {
			throw new Error("toto");
		});
	});
});
