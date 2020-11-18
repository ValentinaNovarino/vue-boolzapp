var app = new Vue (
    {
        el: '#root',
        data: {
            textFilter: '',
            newMessage: '',
            contactIndex: 0,
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'https://boolzap.netlify.app/img/Marco.svg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent',
                            visibility: 'hidden'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                            visibility: 'hidden'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received',
                            visibility: 'hidden'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'https://boolzap.netlify.app/img/Roberto.svg' ,
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent',
                            visibility: 'hidden'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                            visibility: 'hidden'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                            visibility: 'hidden'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'https://boolzap.netlify.app/img/Harry.svg' ,
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received',
                            visibility: 'hidden'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                            visibility: 'hidden'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received',
                            visibility: 'hidden'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: 'https://boolzap.netlify.app/img/Francesca.svg' ,
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                            visibility: 'hidden'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            visibility: 'hidden'
                        },

                    ],
                },
            ]
        },
        methods: {
            // funzione per cambiare chat al click
            changeChat(i) {
                this.contactIndex = i;
                this.autoscroll();
            },
            // funzione per scrivere nuovo messaggio tramite input
            addMessage() {
                // creo oggetto per il nuovo messaggio
                var newItem = {
                    date:'10/01/2020 15:50:00' ,
                    message: '',
                    status: 'sent',
                    visibility: 'hidden'
                }
                // riempo stringa di message con testo scritto nell'input
                newItem.message = this.newMessage;
                // faccio push nell'array messages del nuovo oggetto
                this.contacts[this.contactIndex].messages.push(newItem);
                // svuoto la stringa dell'input
                this.newMessage = '';
                // faccio scroll della finestra della chat nvocando la funzione
                this.autoscroll();
                // creo una timing function che dopo 1 secondo dall'invio del messaggio genera un mesaggio di risposta
                setTimeout(() => {
                    // creo oggetto per il messaggio di risposta
                    var newAnswer = {
                        date:'10/01/2020 15:50:00' ,
                        message: 'Ok',
                        status: 'received',
                        visibility: 'hidden'
                    }
                    // faccio push nell'array messages del nuovo oggetto
                    this.contacts[this.contactIndex].messages.push(newAnswer);

                    // faccio scroll della finestra della chat invocando la funzione
                    this.autoscroll();
                }, 1000);
            },
            autoscroll(){
                Vue.nextTick(function() {
                    let chatContainer = document.getElementsByClassName('chat')[0]
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                });
            },
            searchContact() {
                // variabile per salvare il valore scritto dall'utente
                var userSearch = this.textFilter.toLowerCase();
                // console.log(userSearch);

                // Scorro l'array
                this.contacts.forEach((item) => {
                    if (item.name.toLowerCase().includes(userSearch)) {
                        item.visible = true;
                    } else {
                        item.visible = false;
                    }
                    // console.log(item.visible);
                });
            },
            // funzione per eliminare messaggio al click su delete message
            deleteMessage(i) {
                // cancello il messaggio in base all'indice del messaggio preso in considerazione
                this.contacts[this.contactIndex].messages.splice(i, 1);
            },
            showDropdownMenu(iMessage) {
                if (this.contacts[this.contactIndex].messages[iMessage].visibility == 'hidden') {
                    this.contacts[this.contactIndex].messages[iMessage].visibility = 'active';
                } else {
                    this.contacts[this.contactIndex].messages[iMessage].visibility = 'hidden';
                }
            }
        },
        mounted: function() {
            this.autoscroll();
        },
    }
);
