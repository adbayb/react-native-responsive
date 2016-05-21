/*Decorator sous ES7 (ES2016):
cf. http://derpturkey.com/function-wrapping-with-javascript-decorators/
cf. https://github.com/wycats/javascript-decorators
cf. https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841

Un décorateur prend 3 arguments:
	-> target: c'est l'objet contenant la propriété attaché au décorateur
	(par exemple si on attache un décorateur "@toto" à la fonction tata() de la
	classe Person, le target retournera l'objet Person).
	-> name: c'est le nom de la propriété attaché au décorateur
	(si nous reprenons l'exemple précédent, name retournera "tata")
	-> descriptor: c'est l'objet descriptor définissant les caractéristiques
	de la propriété attaché au décorateur (valeur, accessibilité...). C'est typiquement
	l'objet descriptor utilisé dans la fonction Object.defineProperty
	(cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

Un décorateur peut également être attaché à une classe. Dans ce cas, le target retournera le
constructeur de la classe. name et descriptor retourneront undefined.

Un exemple de decorator sans argument:
function Testable(target, name, descriptor) {
	target.isTestable = true;
}
Utilisation: @Testable

Un exemple de decorator avec argument:
function Testable(isTestable) {
	return (target, name, descriptor) => {
		target.isTestable = isTestable;
	};
}

//Decorator injectant un Higher Order Component (cf. utilité des HOC:
//https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
const InjectHOC = () => {
	return (Component) => {
		return class extends React.Component {
			toto() {
				console.log("totot");
			}
			render() {
				console.log(this);
				return <Component {...this.props} />;
			}
		};
	};
};
*/

//Decorator permettant l'injection de propriétés (méthodes ici) au sein d'une classe
//Ce type d'injection est à éviter car peut entraîner un mauvais comportement dans le cas où
//on override par inadvertence une fonction déjà définie dans le prototype.
//Il faut priviligier l'injection via les Higher Order Components pour permettre une isolation et
//l'absence d'effet de bord:
const InjectEventEmitter = (target) => {
	/*cf. Les fondamentaux de Javascript concernant sa structure en POP (programmation orientée prototype)
	et l'héritage via le chaînage de prototypes:
	http://blog.xebia.fr/2013/06/10/javascript-retour-aux-bases-constructeur-prototype-et-heritage/
	Pour rappel, un prototype est une propriété que tout objet javascript possède (car tout objet est une instance d'Object).
	Il sert de fallback dans le cas où un attribut ou méthode (attribut et méthode sont des propriétés en javascript)
	n'est pas trouvé dans l'objet lui-même (i.e. this)
	(dans ce cas, recherche récursive dans le chaînage prototypé).
	*/
	console.log(target.prototype);
	Object.defineProperty(target.prototype, "test", {
		value: function test() {
			console.log("Ayoub");
		}
	});

	/*//ou définition d'une méthode directement via affectation sur prototype:
	let test = function() {
		console.log("Ayoub");
	};
	target.prototype.test = test;
	*/

	return target;
};

export {
	InjectEventEmitter
};
