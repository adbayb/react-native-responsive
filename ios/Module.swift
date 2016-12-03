import Foundation

// Le décorateur @objc permet de rendre accessible une classe, méthode, variable... au runtime objective-c
// On peut modifier le nom de la classe,... exposé par ce décorateur via le premier argument du décorateur @obj (@obj(name_override))
@objc(Module)
class Module: NSObject {

    @objc func YouMethod(arg1: String, arg2: Bool) -> Void {
        // todo
    }
}