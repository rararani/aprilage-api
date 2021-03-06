
exports.up = function(knex, Promise) {
    return knex.raw(`CREATE TABLE \`agedImage\` 
    (  
        \`id\` INT NOT NULL AUTO_INCREMENT,
	    \`resultID\` INT, 
        \`uri\` VARCHAR(255) NOT NULL,
	    \`age\` INT NOT NULL,
        \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`resultID\`) REFERENCES agingResult(\`id\`)
            ON UPDATE CASCADE ON DELETE CASCADE
    );
`); 
};

exports.down = function(knex, Promise) {
    return knex.raw("DROP TABLE `agedImage`");
};
