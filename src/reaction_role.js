require("./bost.js");

// Add
exports.roleReactionAdd = function (name, message, member) {
  switch (name) {
    case "RESPCAYAYA": // ayaya
      member.roles.add("569394275939516436");
      break;
    case "Baitolinha": // non weeb
      member.roles.add("569394342045679636");
      break;
    case "peepoRESPEC": // azul
      member.roles.add("806545446713557032");
      break;
    case "peepoblushdelao": // rosinha
      member.roles.add("572244549561352202");
      console.log("rosinha");
      break;
    case "peepomari": // corEstranha
      member.roles.add("613745548427657226");
      break;
    case "Ghileolho": // oreto
      member.roles.add("576149263273164845");
      break;
  }
};

// Remove
exports.roleReactionRemove = function (name, message, member) {
  switch (name) {
    case "RESPCAYAYA": // ayaya
      member.roles.remove("569394275939516436");
      break;
    case "Baitolinha": // non weeb
      member.roles.remove("569394342045679636");
      break;
    case "peepoRESPEC": // azul
      member.roles.remove("806545446713557032");
      break;
    case "peepoblushdelao": // rosinha
      member.roles.remove("572244549561352202");
      console.log("rosinha");
      break;
    case "peepomari": // corEstranha
      member.roles.remove("613745548427657226");
      break;
    case "Ghileolho": // oreto
      member.roles.remove("576149263273164845");
      break;
  }
};
