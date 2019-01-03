// SETUP
var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    database: 'amazon'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful');
    // display all items from database once mysql connection has been established
    resetData();
    displayMenu();
});


// FUNCTIONS
var resetData = function() {
    itemToUpdate = {};
    itemToDelete = {};
}

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: '\n\nChoose an action:',
        choices: [
            'Products for Sale',
            'Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Remove A Product'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'Products for Sale':
                viewActiveProducts();
            break;
            case 'Low Inventory':
                viewLowInventory();
            break;
            case 'Add to Inventory':
                addToInventory();
            break;
            case 'Add New Product':
                addNewProduct();
            break;
            case 'Remove A Product':
                deleteProduct();
            break;
        }
    });
};

var viewActiveProducts = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        var listTable = new Table({
            head: ['Item ID', 'Product Name', 'In Stock', 'Price'],
            colWidths: [10, 45, 10, 12]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].item_id, 
                res[i].product_name, 
                res[i].stock_quantity, 
                `$${res[i].price}`]);
            // console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
        }

        console.log(`\n\n${listTable.toString()}\n\n`);
        connection.end();
    });
};

var viewLowInventory = function() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 20 ORDER BY stock_quantity DESC`, (err, res) => {
        if (res.length > 0) {
            var listTable = new Table({
                head: ['Item ID', 'Product Name', 'In Stock', 'Price'],
                colWidths: [10, 45, 10, 12]
            });

            for (var i = 0; i < res.length; i++) {
                listTable.push([res[i].item_id, res[i].product_name, res[i].stock_quantity, `$${res[i].price}`]);
                // console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
            }

            console.log(`\n\n${listTable.toString()}\n\n`);

        } else {
            console.log(chalk.blue.bold('\n\tNo low-stock items!\n'));
        }
        connection.end();
    });
};



