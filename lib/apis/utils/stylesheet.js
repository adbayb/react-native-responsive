class StyleSheet {
	//Attention en javascript: Primitives are passed by value, Objects are passed by "copy of a reference".
	//Donc si on modifie target dans la fonction, on modifiera également l'objet target hors fonction:
	//De même, passer par une variable intermédiaire du style: let output = target ne permet pas de cloner l'objet puisque 
	//output stockera seulement la référence de target et toute modification sur output impactera directement target.
	//Inutile dans notre cas de clôner puique les effets de bord sont nuls et on perdrait de la performance pour peu de choses:
	//from est l'objet depuis lequel toutes ses propriétés seront comparées et copiées dans target en fonction des propriétés de l'objet to
	//Les propriétés de to non présentes dans l'objet from ne seront pas copiés dans target:
	static merge(target, source) {
		for(let property in source) {
			let toMerge = source[property];
			if(target.hasOwnProperty(property)) {
				if(typeof(toMerge) === "object" && !Array.isArray(toMerge)) 
					target[property] = Object.assign({}, target[property], toMerge);
				else 
					target[property] = toMerge;
			}
			else {
				target[property] = toMerge;
			}
		}

		return target;
	}

	static parseSizeFeature(feature) {
		//[0-9]+\.?[0-9]* : size peut être un entier ou un float:
		let parsed = feature.match(/([a-zA-Z\-]+): ?([0-9]+\.?[0-9]*)/);

		if(parsed)
			return {
				key: parsed[1],
				value: Number(parsed[2])
			};

		return null;
	}

	static toCamelCase(str) {
		//[a-zA-Z\-] comme la clé de l'objet doit être un alpha pouvant contenir des -
		//(cf. https://developer.mozilla.org/fr/docs/Web/CSS/Media_queries)
		return str.replace(/-([a-z])/gi, (match, group1) => {
			return group1.toUpperCase();
		});
	}

	/*static create(obj) {
		//Object.keys(obj).map((key, value, data) => {
		//	console.log(key, obj[key], data);
		//});
		for(let property in obj) {
			//Teste si la propriété de l'objet est un media query:
			if(/@media/.test(property)) {
				//Récupération des propriétés media query (pour le moment entre parenthèses):
				//Expressions régulières:
				//cf. https://acrobatusers.com/tutorials/text-matching-regular-expressions
				//cf. http://lumadis.be/regex/tuto_pcre.php
				//Typiquement ici:
				//	\( : match an opening parentheses
				//	( : begin capturing group
				//	[^)]+: match one or more non ) characters
				//	) : end capturing group
				//	\) : match closing parentheses

				//Mesure des performances des différentes possibilité d'extraction:
				//cf. https://blog.mariusschulz.com/2013/11/22/measuring-execution-times-in-javascript-with-consoletime
				//let t0 = performance.now();
				console.time("regexp_execution_time");
				for(let i=0; i<1000; i++) {
					let reg = /\(([^)]+)\)/g;
					let matches, output = [];
					while (matches = reg.exec(property)) {
					    output.push(matches[1]);
					}
				}
				//let t1 = performance.now();
				console.timeEnd("regexp_execution_time");

				//let t2 = performance.now();
				console.time("functional_execution_time");
				for(let i=0; i<1000; i++) {
					var matches = property.split('(')
					.filter(function(v){ return v.indexOf(')') > -1})
					.map( function(value) {
						return value.split(')')[0]
					})
				}
				//let t3 = performance.now();
				console.timeEnd("functional_execution_time");

				console.time("split_execution_time");
				for(let i=0; i<1000; i++) {
					let newTxt = property.split('(');
					let matches, output = [];
					for (let j = 1; j < newTxt.length; j++) {
					    	output.push(newTxt[j].split(')')[0]);
						//console.log(newTxt[j].split(')')[0]);
					}
				}
				console.timeEnd("split_execution_time");

				//split est le plus souvent rapide (pas toujours vérifié), on part sur du regexp pour des raisons de simplicité:
				//regexp_execution_time: 0.805ms
				//functional_execution_time: 6.962ms
				//split_execution_time: 0.982ms

				//console.log((t1 - t0)+"ms", (t3 - t2)+"ms", performance.now());
			}
		}
	}*/
}

export default StyleSheet;