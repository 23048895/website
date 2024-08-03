// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard JS Loaded");

    // Sidebar navigation
    const menuItems = document.querySelectorAll('.sidebar nav ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            item.classList.add('active');
            if (item.id === 'invoice-management') {
                window.location.href = 'invoicemanagement.html';
            } else if (item.id === 'transaction') {
                window.location.href = 'transaction.html';
            } else if (item.id === 'blockchain-ledger') {
                window.location.href = 'blockchain.html';
            } else if (item.id === 'homepage') {
                window.location.href = 'index.html';
            }
        });
    });

    // Update balance if new balance exists in localStorage
    const newBalance = localStorage.getItem('newBalance');
    if (newBalance && document.querySelector('.balance')) {
        console.log("New balance found in localStorage:", newBalance);
        document.querySelector('.balance').textContent = `$ ${parseFloat(newBalance).toLocaleString()}`;
        localStorage.removeItem('newBalance');  // Clear the temporary balance after updating
    }

    // Invoice management functionalities
    if (document.getElementById('create-invoice')) {
        const createInvoiceBtn = document.getElementById('create-invoice');
        const updateInvoiceBtn = document.getElementById('update-invoice');
        const modal = document.getElementById('invoice-modal');
        const closeModal = document.getElementsByClassName('close')[0];
        const form = document.getElementById('invoice-form');
        const invoiceTableBody = document.getElementById('invoice-table-body');
        let editingInvoice = null;

        createInvoiceBtn.addEventListener('click', () => {
            openModal();
        });

        updateInvoiceBtn.addEventListener('click', () => {
            const selectedInvoice = prompt('Enter the Invoice ID to update:');
            if (selectedInvoice) {
                const row = Array.from(invoiceTableBody.children).find(row => row.children[0].textContent === selectedInvoice);
                if (row) {
                    editingInvoice = row;
                    populateForm(row);
                    openModal();
                } else {
                    alert('Invoice not found!');
                }
            }
        });

        closeModal.addEventListener('click', () => {
            closeModalFunc();
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModalFunc();
            }
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const invoiceData = {
                id: formData.get('invoice-id'),
                customer: formData.get('customer'),
                date: formData.get('date'),
                amount: formData.get('amount'),
                status: formData.get('status')
            };

            if (editingInvoice) {
                updateInvoice(editingInvoice, invoiceData);
            } else {
                addInvoice(invoiceData);
            }
            closeModalFunc();
        });

        function openModal() {
            modal.style.display = "block";
        }

        function closeModalFunc() {
            modal.style.display = "none";
            form.reset();
            editingInvoice = null;
        }

        function populateForm(row) {
            form['invoice-id'].value = row.children[0].textContent;
            form['customer'].value = row.children[1].textContent;
            form['date'].value = row.children[2].textContent;
            form['amount'].value = row.children[3].textContent.replace('$', '');
            form['status'].value = row.children[4].textContent;
        }

        function addInvoice(invoiceData) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${invoiceData.id}</td>
                <td>${invoiceData.customer}</td>
                <td>${invoiceData.date}</td>
                <td>$${invoiceData.amount}</td>
                <td>${invoiceData.status}</td>
            `;
            invoiceTableBody.appendChild(newRow);
        }

        function updateInvoice(row, invoiceData) {
            row.children[0].textContent = invoiceData.id;
            row.children[1].textContent = invoiceData.customer;
            row.children[2].textContent = invoiceData.date;
            row.children[3].textContent = `$${invoiceData.amount}`;
            row.children[4].textContent = invoiceData.status;
        }
    }

    // Transaction management functionalities
    if (document.getElementById('create-transaction')) {
        const createTransactionBtn = document.getElementById('create-transaction');
        const updateTransactionBtn = document.getElementById('update-transaction');
        const modal = document.getElementById('transaction-modal');
        const closeModal = document.getElementsByClassName('close')[0];
        const form = document.getElementById('transaction-form');
        const transactionContainer = document.querySelector('.transaction-container');
        let editingTransaction = null;

        createTransactionBtn.addEventListener('click', () => {
            openModal();
        });

        updateTransactionBtn.addEventListener('click', () => {
            const selectedTransaction = prompt('Enter the Transaction ID to update:');
            if (selectedTransaction) {
                const card = Array.from(transactionContainer.children).find(card => card.querySelector('.transaction-id').textContent === selectedTransaction);
                if (card) {
                    editingTransaction = card;
                    populateForm(card);
                    openModal();
                } else {
                    alert('Transaction not found!');
                }
            }
        });

        closeModal.addEventListener('click', () => {
            closeModalFunc();
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModalFunc();
            }
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const transactionData = {
                id: formData.get('transaction-id'),
                description: formData.get('description'),
                date: formData.get('date'),
                amount: formData.get('amount'),
                status: formData.get('status')
            };

            if (editingTransaction) {
                updateTransaction(editingTransaction, transactionData);
            } else {
                addTransaction(transactionData);
            }
            closeModalFunc();
        });

        function openModal() {
            modal.style.display = "block";
        }

        function closeModalFunc() {
            modal.style.display = "none";
            form.reset();
            editingTransaction = null;
        }

        function populateForm(card) {
            form['transaction-id'].value = card.querySelector('.transaction-id').textContent;
            form['description'].value = card.querySelector('.description').textContent;
            form['date'].value = card.querySelector('.date').textContent;
            form['amount'].value = card.querySelector('.amount').textContent.replace('$', '');
            form['status'].value = card.querySelector('.status').textContent;
        }

        function addTransaction(transactionData) {
            const newCard = document.createElement('div');
            newCard.classList.add('transaction-card');
            newCard.innerHTML = `
                <div class="transaction-icon">💰</div>
                <div class="transaction-details">
                    <p class="amount">$${transactionData.amount}</p>
                    <p class="description">${transactionData.description}</p>
                    <p class="status ${transactionData.status.toLowerCase()}">${transactionData.status}</p>
                    <p class="date">${transactionData.date}</p>
                </div>
            `;
            transactionContainer.appendChild(newCard);
        }

        function updateTransaction(card, transactionData) {
            card.querySelector('.amount').textContent = `$${transactionData.amount}`;
            card.querySelector('.description').textContent = transactionData.description;
            card.querySelector('.status').textContent = transactionData.status;
            card.querySelector('.status').className = `status ${transactionData.status.toLowerCase()}`;
            card.querySelector('.date').textContent = transactionData.date;
        }
    }

    // Blockchain functionalities
    if (document.getElementById('transaction-form')) {
        class Block {
            constructor(index, timestamp, data, previousHash = '') {
                this.index = index;
                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.hash = this.calculateHash();
            }

            calculateHash() {
                return CryptoJS.SHA256(
                    this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)
                ).toString();
            }
        }

        class Blockchain {
            constructor() {
                this.chain = [this.createGenesisBlock()];
            }

            createGenesisBlock() {
                return new Block(0, "01/01/2024", "Genesis Block", "0");
            }

            getLatestBlock() {
                return this.chain[this.chain.length - 1];
            }

            addBlock(newBlock) {
                newBlock.previousHash = this.getLatestBlock().hash;
                newBlock.hash = newBlock.calculateHash();
                this.chain.push(newBlock);
            }

            isChainValid() {
                for (let i = 1; i < this.chain.length; i++) {
                    const currentBlock = this.chain[i];
                    const previousBlock = this.chain[i - 1];

                    if (currentBlock.hash !== currentBlock.calculateHash()) {
                        return false;
                    }

                    if (currentBlock.previousHash !== previousBlock.hash) {
                        return false;
                    }
                }
                return true;
            }
        }

        // Initialize blockchain
        const myBlockchain = new Blockchain();

        document.getElementById('transaction-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;
            const timestamp = new Date().toLocaleString();

            const newBlock = new Block(
                myBlockchain.chain.length,
                timestamp,
                { description, amount }
            );

            myBlockchain.addBlock(newBlock);
            addTransactionToTable(newBlock);

            // Clear the form inputs after submission
            document.getElementById('transaction-form').reset();
        });

        function addTransactionToTable(block) {
            const transactionTableBody = document.querySelector("#transaction-table tbody");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${block.index}</td>
                <td>${block.timestamp}</td>
                <td>${block.data.description}</td>
                <td>${block.data.amount}</td>
                <td>Completed</td>
                <td><a href="#" onclick="showDetails(${block.index})">${block.hash}</a></td>
            `;
            transactionTableBody.appendChild(row);
        }

        function showDetails(index) {
            const block = myBlockchain.chain[index];
            alert(`
                ID: ${block.index}
                Date: ${block.timestamp}
                Description: ${block.data.description}
                Amount: ${block.data.amount}
                Status: Completed
                Blockchain Hash: ${block.hash}
            `);
        }

        function applyFilters() {
            // Implement filter logic here
        }

        function exportTransactions() {
            // Implement export logic here
        }
    }

    // Topup functionality
    const topupBtn = document.getElementById('topup');
    const topupModal = document.getElementById('topup-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const topupForm = document.getElementById('topup-form');

    if (topupBtn) {
        topupBtn.addEventListener('click', () => {
            topupModal.style.display = "block";
        });

        closeModal.addEventListener('click', () => {
            topupModal.style.display = "none";
        });

        window.onclick = function(event) {
            if (event.target == topupModal) {
                topupModal.style.display = "none";
            }
        };

        topupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const paymentType = document.getElementById('payment-type').value;
            const amount = document.getElementById('amount').value;
            if (paymentType === 'credit-card') {
                localStorage.setItem('topupAmount', amount);
                window.location.href = 'payment.html';
            }
        });
    }

    // Payment functionality
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = 'otp.html';
        });
    }

    // OTP functionality
    const otpForm = document.getElementById('otp-form');
    if (otpForm) {
        otpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("OTP Form Submitted");
            const topupAmount = localStorage.getItem('topupAmount');
            console.log("Topup Amount from LocalStorage:", topupAmount);
            if (topupAmount) {
                const currentBalance = parseFloat(localStorage.getItem('currentBalance') || '700000');
                const newBalance = currentBalance + parseFloat(topupAmount);
                console.log("New Balance to be set:", newBalance);
                localStorage.setItem('newBalance', newBalance);
                localStorage.setItem('currentBalance', newBalance);
                alert(`Topup of $${topupAmount} was successful!`);
                window.location.href = 'dashboard.html';
            } else {
                alert("No topup amount found in LocalStorage.");
            }
        });
    }
});
