var db = require('../dbconnection');

var Kiosco = {

	/*******************************************************Planes de estudio*****************************************************************************************/
	//	OBTIENE TODAS LAS FACULTADES
	getAllFaculties: function(callback) {
		var PreLoad = function(err, rows) {
				if (!err) {
					var newRows = [];
					for (var i = 0; i < rows.length; i++) {
						newRows.push(JSON.parse(rows[i]["CAST(OBJECT AS CHAR(10000) CHARACTER SET utf8)"]));
					}
				}
				return callback(err, newRows);
			}
			//return db.query("Select OBJECT from facultades", callback);
		return db.query("Select CAST(OBJECT AS CHAR(10000) CHARACTER SET utf8) from facultades", PreLoad);
	},

	//OBTIENE TODAS LAS CARRERAS QUE PERTENECEN A UNA FACULTAD, PREGRADO, POSTGRADO EN PARTICULAR
	getCareers: function(id, callback) {
		var PreLoad = function(err, rows) {
			if (!err) {
				var newRows = [];
				for (var i = 0; i < rows.length; i++) {
					newRows.push(JSON.parse(rows[i]["CAST(OBJECT AS CHAR(10000) CHARACTER SET utf8)"]));

				}
			}
			return callback(err, newRows);
		}
		return db.query("Select CAST(OBJECT AS CHAR(10000) CHARACTER SET utf8) from carreras where TYPE=?", [id], PreLoad);
	},

	//OBTIENE UNA CARRERA EN PARTICULAR INGRESANDO EL STRING DEL NOMBRE DELA CARRERA
	getParticularCareer: function(id, callback) {
		return db.query("SELECT * FROM carreras WHERE NAME LIKE ?%", [id], callback);
	},
	/****************************************************************end Planes de estudio*****************************************************************************************************/

	/*********************************************************************Horarios de clase************************************************************************************************/
	//OBTIENE TODOS LOS EDIFICIOS
	getBuildings: function(callback) {

		return db.query("Select * from edificiosAuditorios", callback);
	},
	//OBTIENE LOS AUTITORIOS DE UN EDIFICIO EN PARTICULAR
	getAudience: function(id, callback) {
		var PreLoad = function(err, rows) {
			if (!err) {
				var newRows = [];
				for (var i = 0; i < rows.length; i++) {
					newRows.push(JSON.parse(rows[i]["CAST(OBJECT AS CHAR(10000) CHARACTER SET utf8)"]));

				}
			}
			return callback(err, newRows);
		}
		return db.query("Select CAST(SCHEDULES AS CHAR(10000) CHARACTER SET utf8) from auditorios where ID_AUDIENCE=?", [id], callback);
		//return db.query("Select * from auditorios where ID_AUDIENCE=?", [id], callback);
	},
	//OBTIENE UNA SALA EN PARTICULAR *** Este va por un auditorio por descripción pero debe ser es ir por una clase
	getParticularAudience: function(id, callback) {
		return db.query("SELECT * FROM auditorios WHERE DESCRIPTION LIKE ?", [id], callback);
	},
	/*********************************************************************end Horarios de clase************************************************************************************************/

	/*********************************************************************Directorio institucional************************************************************************************************/
	//OBTIENE TODAS LAS UNIDADES DEL DIRECTORIO DE LA UNIVERSIDAD
	getUnits: function(callback) {
		return db.query("Select * from unidades", callback);
	},

	//OBTIENE LAS DEPENDENCIAS DE UNA UNIDAD
	getUnitsDependences: function(id, callback) {
		console.log(id);
		return db.query("Select * from directorio where UNIT_ID=?", [id], callback);
	},

	//OBTIENE UNA DEPENDENCIA EN PARTICULAR POR MEDIO DEL STRING CON EL NOMBRE DE LA DEPENDENCIA
	getParticularDependence: function(id, callback) {
		return db.query("SELECT * FROM directorio WHERE DESCRIPTION LIKE ?%", [id], callback);
	},

	/*********************************************************************end Directorio institucional************************************************************************************************/

};
module.exports = Kiosco;