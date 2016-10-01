/*
Etant donné que le script est écrit sous ES6, on doit le transpiler sous ES5
Même si Node.js v6.7.0 a implémenté 99% des fonctionalités ES6 (cf. http://node.green/ 
mais le import statement n'est toujours pas supporté ceci dit en passant), pour ne pas 
contraindre les utilisateurs à utiliser cette version de node pour compiler le projet, on 
passera par un transpileur:
Comme c'est un script à utiliser en environnement de dev, inutile de passer par webpack
ou autre bundler avec output. On passera par babel-node pour traduire à la volée.


NB: Pour contraindre un utilisateur a utilisé une certaine version de node (ou npm), il faut ajouter au package.json, la règle suivante:
dans package.json { 
	"engineStrict": true,
	"engines": { 
		"node": ">=6.7.0",
		"npm": "3.10.3"
	},
}

engineStrict permet d'afficher une erreur et d'interrompre l'installation (au lieu d'un warning)
De plus, cette contrainte n'est effective que lors de l'installation du package spécifiant la contrainte !
cf. http://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html
cf. https://docs.npmjs.com/files/package.json
*/

//Nodejs builtin lib:
import path from "path";
import fs from "fs";
//Utility libs depuis npm:
import watch from "node-watch";
//minimatch est la librarie permettant de vérifier que les paths correspondent 
//bien à une expression glob (en les convertissant en objet RegExp):
import minimatch from "minimatch";
import { copy, remove } from "fs-extra";
//ou: import fs from "fs-extra"; avec fs.copy();

//Dans les projet Node, le Current Work Directory "." correspond au dossier contenant package.json 
//(donc ici . ne correspond pas au dossier bin). Pour avoir le chemin du dossier contenant watch.js, 
//il faut faire appel à la variable globale de node: __dirname.

const watchedFolders = [
	//JavaScript:
	"../lib",
	//Android:
	"../android",
	//Ios:
	"../ios"
];

const filter = (callback, pattern) => {
	//Exemple de valeur pour pattern (surveillance de deux types de fichiers): "**/*.+(jsx|txt)"
	console.log(`[WATCHER] Glob pattern(s) watched: ${pattern}`);
	return (filename) => {
		if(!pattern || minimatch(filename, pattern))
			return callback(filename);
		
		return null;
	};
};

const exist = (filename) => {
	try {
		fs.accessSync(filename);
		return true;
	}
	catch(e) {
		return false;
	}
};

const copyOrDelete = (source, destination) => {
	if(exist(source)) {
		console.log(`[WATCHER] Copying "${source}" to ${destination}`);
		return copy(source, destination, (err) => {
			if(err) 
				return console.error(`[WATCHER] Error(s) occur(s): ${err}`);
		});
	}
	else {
		console.log(`[WATCHER] Deleting ${destination}`);
		return remove(destination, (err) => {
			if(err) 
				return console.error(`[WATCHER] Error(s) occur(s): ${err}`);
		});
	}
};

const watcher = watch(
	watchedFolders, 
	filter(
		(filename) => {
			console.log(`[WATCHER] Change(s) occur(s) for "${filename}"`);
			//On isole le chemin relative vers le fichier modifié (chemin absolu source) pour 
			//pouvoir construire le chemin vers la destination (dans la lib dans node_modules)
			//split() permet de faire comme en PHP un explode sur un string (en argument le délimiteur qui sera ici le
			//chemin vers le dossier parent (sourceFolder) => on pourra ainsi isoler le chemin relatif du fichier).
			//split() retourne un tableau et ne modifie donc pas le string d'origine.
			//pop() supprimer le dernier élément du tableau en le retournant (façon rapide et belle de récupérer 
			//le dernier élément même si destructive (on ne réutilisera plus le tableau généré par split donc OK ;))):
			const relativePath = filename.split("..").pop();
			copyOrDelete(filename, path.join("./node_modules/react-native-responsive", relativePath));
		}
	)
);

/*
watcher.on("change", (filename) => {
	console.log("Another way to log each change");
});
*/

watcher.on("error", (err) => {
	console.error(`[WATCHER] Error(s) occur(s): ${err}`);
	watcher.close();
});
