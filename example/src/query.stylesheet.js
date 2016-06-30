import { StyleSheet } from "react-native";
import Model from "./query.model.js";

class MediaQueryStylesheet {
	static create(stylesheet) {
		if(stylesheet) {
			let newStylesheet = {};
			for(let property in stylesheet) {
				if(/@media/.test(property)) {
					if(MediaQueryStylesheet.isValidRule(property)) {
						newStylesheet = Object.assign({}, newStylesheet, stylesheet[property]);
					}
				} else
					newStylesheet[property] = stylesheet[property];
			}

			return newStylesheet;
		}

		return null;
	}

	static isValidRule(rule) {
		if(rule) {
			let matches = [];
			let reg = /\(([^()]+)\)/g;

			let isValid = true;
			while((matches = reg.exec(rule)) && isValid) {
				isValid = MediaQueryStylesheet.isValidFeature(matches[1]);
			}

			return isValid;
		}

		return false;
	}

	static isValidFeature(feature) {
		if(feature) {
			//Suivant le type de feature (check sur la clé), affecter le validateur associé
			//(pour le moment un seul validateur sur les propriétés taille):
			return MediaQueryStylesheet.isValidSizeFeature(feature);
		}

		return false;
	}

	static isValidSizeFeature(feature) {
		let map = {
			//TODO: dans query.model.js créer fonction statique de vérification
			//width et height avec un param du type "min", "max", "equal" pour effectuer
			//l'opération de vérification adéquate
			"device-width": testWidth,
			"min-device-width": testWidth,
			"max-device-width": testWidth,
			"device-height": testHeight,
			"min-device-height": testHeight,
			"max-device-height": testHeight,
			"device-pixel-ratio": testPixelRatio,
			"min-device-pixel-ratio": testPixelRatio,
			"max-device-pixel-ratio": testPixelRatio
		};
		let size = MediaQueryStylesheet.parseSizeFeature(feature);

		if(size)
			return map[size.key](size.value);

		return false;
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

export default MediaQueryStylesheet;

//Bouchons:
function testWidth(width) {
	//console.log("width");
	return(width >= 100) ? true : false;
}

function testHeight(height) {
	//console.log("height");
	return(height >= 100) ? true : false;
}

function testPixelRatio(ratio) {
	//console.log("ratio");
	return(ratio === 1.5) ? true : false;
}

/*console.time("performance_test");
let media = MediaQueryStylesheet.create({
	test: {
		width: "200"
	},
	"@media (min-device-width: 100px) and (max-device-height: 100px) and (device-pixel-ratio: 1.5)": {
		test: {
			width: "400",
			height: "200",
			display: "flex"
		}
	},
	"@media (min-device-width: 200px) and (max-device-height: 100px)": {
		display: "flex"
	}
});
console.log(media);
console.timeEnd("performance_test");*/
