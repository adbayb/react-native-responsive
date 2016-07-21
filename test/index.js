//Mocha est le framework de test unitaire le plus célèbre de Nodejs fournissant de nombreux outils et apis 
//(cycle de vie des tests, reporting des tests de coverage, reporting concernant la durée des tests, choix libre de la librairie d'assertion...):
//cf. doc apis: https://mochajs.org
//Chai est la librairie, l'outil d'assertion la plus complète (plus complète que le module natif Assert de nodejs (cf. https://nodejs.org/api/assert.html)):
//Elle permet d'offrir différents styles permettant la construction d'assertion (via expect, assert, should). Les différences 
//entre les styles sont spécifiées dans http://chaijs.com/guide/styles/#differences :
//cf. doc apis: http://chaijs.com/api/
//Mocha et chai peuvent aussi fonctionner côté navigateur: pour initialiser un projet de test côté browser, il suffit de l'initialiser via: mocha init nomProjet

//Bonne documentation unit test dans node.js: http://fredkschott.com/post/2014/05/nodejs-testing-essentials/
//cf. mocha, chai en ES2015: https://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/

//Pour information, les packages d'un package listés dans devDependencies ne sont pas installés lorsque le package est installé dans un autre projet
//Autrement dit, les packages installés via npm install depuis le repository npmjs ne voient pas leur devDependencies installés:
//cf. http://zhiye.li/2014-06-23-npm-dependencies-and-devDependencies.html

import {
	assert,
	expect,
	should as loadShould
} from "chai";
//should en import ne peut pas être utilisé directement, elle doit être chargée via un appel à loadShould:
const should = loadShould();

/*
//TEMPLATE de test et doc:
//L'api mocha "describe"" permet de décrire une suite de test (c'est un container de tests pouvant contenir d'autres describe en son sein):
describe('ClassName', function() {
	//Stubs à tester:
	let test = function() {
		return true;
	};

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
	describe('#functionName()', function() {
		//L'api mocha "it" correspond à un jeu de test (si on a plusieurs assertions (expect, assert...), 
		//dès qu'une assertion est fausse, le test échoue et les assertions suivantes ne sont pas testées):
		it('should return true', function() {
			let test = true;

			//EXPECT assertion style, exemples:
			//to, be, been, is, and, has, have, with, that, which, at, of, same sont des "language chains": ils ne fournissent aucune fonctionnalité de tests, 
			//ils permettent seulement d'améliorer la readabilité des assertions. D'après doc: The following are provided as chainable getters 
			//to improve the readability of your assertions. They do not provide testing capabilities unless they have been overwritten by a plugin.
			//not, equal, false, true, undefined, below... sont les apis assertions de chai: ils fournissent des fonctionnalité de tests tout en permettant une
			//bonne readabilité:
			expect(test).to.be.true;
			expect(test).is.true;
			expect(test).is.not.false;

			//ASSERT assertion style, exemples:
			assert.isTrue(test, "Test variable is not true");
			assert.equal(test, true, "test != true");
			assert.equal(test, true, "test !== true");

			//SHOULD assertion style, exemples:
			//should a seulement 3 apis d'assertions: equal, throw, exist (et leur négation: .not.equal...)
			console.log(should.equal);
			test.should.equal(false);
		});
	});
});
*/
