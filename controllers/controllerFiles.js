import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"
import FileModel from "../models/files.js"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
class FileController {
    erreur = null
    constructor() {
        this.erreur = new G_error()
    }

    /**
*  @function add()
*  @param req  
*  @param res  
*  add data
*/



    add = async (req, res) => {

        try {
            const { nom, extension, size, ticket_ref } = req?.body
            const data = {
                nom: nom,
                extension: extension,
                size: size,
                ticket_ref: ticket_ref
            }
            const result = await FileModel.query().insert(data)

            isValuePresent(result) ?
                result?.id != 0 ?
                    toastSms(res, true, req?.body) :
                    toastSms(res, false, "data not save") :
                toastSms(res, false, "data save error")


        } catch (error) {
            console.log(error);

            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }
    /**
*  @function show()
*  @param req  
*  @param res  
*  show all data
*/

    show = async (_, res) => {
        try {
            const result = await FileModel.query()
            isValuePresent(result) ?
                toastSms(res, "succes", result) :
                toastSms(res, false, "Aucun fichier n'as été trouvé")
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }

    }



    /**
*  @function edit()
*  @param req  
*  @param res  
*  edit data
*/

    edit = async (req, res) => {
        try {
            const { ticket } = req?.params
            const result = await FileModel.query().findOne({ "ticket_ref": ticket })
            isValuePresent(result) ?
                toastSms(res, "succes", result) :
                toastSms(res, false, "Aucun fichier n'as été trouvé")
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }

    }

    /**
     * verifie si un fichier existe
     */
    existeFile = (cheminFichier, callback) => {
        fs.stat(cheminFichier, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Le fichier n'existe pas
                    callback(false);
                } else {
                    // Une autre erreur s'est produite
                    console.error("Erreur lors de la vérification du fichier:", err);
                    callback(false);
                }
            } else {
                // Le fichier existe
                callback(true);
            }
        });
    };

    /**
    *  @function edit()
    *  @param req  
    *  @param res  
    *  edit data
    */

    download = async (req, res) => {
        const { file } = req?.params


        const __filename = fileURLToPath(import.meta.url);
        var downloadPath = path.join(path.resolve(__filename, '../..'), '/uploads');
        var urlFile = downloadPath + "/" + file

        this.existeFile(urlFile, (existe) => {
            if (existe) {
                res.download(urlFile, (err) => {

                    if (err) {
                        res.send(
                            `<div>
                             Le fichier "  ${file} " n'existe pas dans le server.
                           </div>`
                        )
                    }
                })
            } else {
                res.send(
                    `<div>
                    Le fichier "  ${file} "  n'existe pas dans le server.
                           </div>`
                )
            }
        });

        /**/

    }

    /**
    *  @function del()
    *  @param req  
    *  @param res  
    *  delete data
    */
    del = async (req, res) => {

    }

    /**
    *  @function update()
    *  @param req  
    *  @param res  
    *  fonction de mise a jour
    */
    update = async (req, res) => {

    }


}

export default FileController