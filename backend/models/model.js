const { Sequelize, DataTypes, Model } = require('sequelize');

// Database connection (configure as per your environment)
const sequelize = new Sequelize('infinity', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
});

// Utilisateurs Model
class Utilisateur extends Model {}
Utilisateur.init({
  id_utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'ENSEIGNANT', 'ETUDIANT'),
    allowNull: false,
    defaultValue: 'ETUDIANT'
  },
  langue_maternelle: {
    type: DataTypes.STRING
  },
  niveau_langue: {
    type: DataTypes.ENUM('debutant', 'intermediaire', 'avance')
  }
}, {
  sequelize,
  modelName: 'Utilisateur',
  tableName: 'utilisateurs'
});

// Cours Model
class Cours extends Model {}
Cours.init({
  id_cours: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  langue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  niveau_difficulte: {
    type: DataTypes.ENUM('debutant', 'intermediaire', 'avance')
  },
  duree: {
    type: DataTypes.INTEGER // durée en minutes
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  sequelize,
  modelName: 'Cours',
  tableName: 'cours'
});

// Leçons Model
class Lecon extends Model {}
Lecon.init({
  id_lecon: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cours',
      key: 'id_cours'
    }
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenu: {
    type: DataTypes.TEXT
  },
  exercices: {
    type: DataTypes.JSONB
  },
  duree: {
    type: DataTypes.INTEGER // durée en minutes
  }
}, {
  sequelize,
  modelName: 'Lecon',
  tableName: 'lecons'
});

// Inscriptions Model
class Inscription extends Model {}
Inscription.init({
  id_inscription: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id_utilisateur'
    }
  },
  id_cours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cours',
      key: 'id_cours'
    }
  },
  date_inscription: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  progression: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Inscription',
  tableName: 'inscriptions'
});

// Ressources Model
class Ressource extends Model {}
Ressource.init({
  id_ressource: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_lecon: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lecons',
      key: 'id_lecon'
    }
  },
  type: {
    type: DataTypes.ENUM('manuel', 'quiz', 'video', 'audio')
  },
  contenu: {
    type: DataTypes.TEXT
  },
  duree: {
    type: DataTypes.INTEGER // durée en minutes
  }
}, {
  sequelize,
  modelName: 'Ressource',
  tableName: 'ressources'
});

// Objectifs Model
class Objectif extends Model {}
Objectif.init({
  id_objectif: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id_utilisateur'
    }
  },
  id_cours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cours',
      key: 'id_cours'
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_echeance: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Objectif',
  tableName: 'objectifs'
});

// Evaluations Model
class Evaluation extends Model {}
Evaluation.init({
  id_evaluation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id_utilisateur'
    }
  },
  id_cours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cours',
      key: 'id_cours'
    }
  },
  note: {
    type: DataTypes.DECIMAL(5, 2)
  },
  commentaire: {
    type: DataTypes.TEXT
  },
  date_evaluation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Evaluation',
  tableName: 'evaluations'
});

// Messages Model
class Message extends Model {}
Message.init({
  id_message: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_expediteur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id_utilisateur'
    }
  },
  id_destinataire: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs',
      key: 'id_utilisateur'
    }
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_envoi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages'
});

// Associations
Utilisateur.hasMany(Inscription, { foreignKey: 'id_utilisateur' });
Cours.hasMany(Inscription, { foreignKey: 'id_cours' });
Inscription.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Inscription.belongsTo(Cours, { foreignKey: 'id_cours' });

Cours.hasMany(Lecon, { foreignKey: 'id_cours' });
Lecon.belongsTo(Cours, { foreignKey: 'id_cours' });

Lecon.hasMany(Ressource, { foreignKey: 'id_lecon' });
Ressource.belongsTo(Lecon, { foreignKey: 'id_lecon' });

Utilisateur.hasMany(Objectif, { foreignKey: 'id_utilisateur' });
Cours.hasMany(Objectif, { foreignKey: 'id_cours' });
Objectif.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Objectif.belongsTo(Cours, { foreignKey: 'id_cours' });

Utilisateur.hasMany(Evaluation, { foreignKey: 'id_utilisateur' });
Cours.hasMany(Evaluation, { foreignKey: 'id_cours' });
Evaluation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Evaluation.belongsTo(Cours, { foreignKey: 'id_cours' });

Utilisateur.hasMany(Message, { as: 'Envoyes', foreignKey: 'id_expediteur' });
Utilisateur.hasMany(Message, { as: 'Recus', foreignKey: 'id_destinataire' });

module.exports = {
  sequelize,
  Utilisateur,
  Cours,
  Lecon,
  Inscription,
  Ressource,
  Objectif,
  Evaluation,
  Message
};