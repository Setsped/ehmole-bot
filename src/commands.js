const { Message } = require("discord.js");

require("./bost.js");

var bot = require("./bost.js");

exports.kickUser = function (member, args, message) {
  if (message.member.hasPermission("KICK_MEMBERS")) {
    if (args.length === 0) {
      // Se não passou um membro
      message.channel.send("Quem é pra kickar?");
    } else {
      // Se passou um membro
      if (member) {
        if (member.kickable) {
          // Se kickável
          member.kick().then(message.channel.send(`${member} foi kickado 🥳.`));
        } else {
          // Se não kickável
          message.channel.send("Não consigo kickar esse usuário");
        }
      } else {
        // Se não existir o membro 'member = false'
        message.channel.send("Essa pessoa não existe.");
      }
    }
  } else {
    // Se não pode kickar
    message.channel.send("Mano tu nem pode kickar.");
  }
};

exports.banUser = function (member, args, message) {
  if (message.member.hasPermission("BAN_MEMBERS")) {
    if (args.length === 0) {
      message.channel.send("Quem é pra banir?");
    } else {
      if (member) {
        if (member.bannable) {
          member.ban();
          message.channel.send(`${member} foi bandido.`);
        } else {
          message.channel.send("Não consigo banir esse usuário.");
        }
      } else {
        message.channel.send("Essa pessoa não existe.");
      }
    }
  } else {
    message.channel.send("Mano tu nem pode banir.");
  }
};

exports.unbanUser = function (member, args, message) {
  if (message.member.hasPermission("BAN_MEMBERS")) {
    if (args.length === 0) {
      message.channel.send("Quem é pra banir?");
    } else {
      if (member) {
        if (member.unbannable) {
          member.unban();
          message.channel.send(`${member} foi desbandido.`);
        } else {
          message.channel.send("Não consigo desbanir esse usuário.");
        }
      } else {
        message.channel.send("Essa pessoa não existe.");
      }
    }
  } else {
    message.channel.send("Mano tu nem pode desbanir.");
  }
};

exports.ameacaUser = function (message) {
  message.channel.send(
    "Bem Vindo ao meu server se comporte porfavor isso e uma ameaça"
  );
};

exports.warnUser = function (message) {};

exports.festa = function (message) {
  message.channel.send("🥳");
};
