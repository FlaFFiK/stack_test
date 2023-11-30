
var app = new Vue({
    el: '#app',
    data: {
        items: [
            {
                id: 1,
                company_name: "Магнит",
                fio_director: "Васильев М.И.",
                phone: '+7 (980) 700-33-23'
            },
            {
                id: 2,
                company_name: "Пятёровка",
                fio_director: "Смолин И.Ю.",
                phone: '+7 (920) 146-10-46'
            },
            {
                id: 3,
                company_name: "Ярче",
                fio_director: "Дымова У.Д.",
                phone: '+7 (920) 146-30-46'
            },
            {
                id: 4,
                company_name: "Светофор",
                fio_director: "Красков В.А.",
                phone: '+7 (920) 146-46-46'
            },
            {
                id: 5,
                company_name: "Светофор",
                fio_director: "Краскова А.А.",
                phone: '+7 (980) 663-39-93'
            },
            {
                id: 6,
                company_name: "Маяк",
                fio_director: "Смирнов М.А.",
                phone: '+7 (910) 100-10-21'
            },
            {
                id: 7,
                company_name: "Ярче",
                fio_director: "Красков В.А.",
                phone: '+7 (920) 146-30-46'
            },
            {
                id: 8,
                company_name: "Маяк",
                fio_director: "Соколов С.Ю.",
                phone: '+7 (920) 146-46-46'
            },
            {
                id: 9,
                company_name: "Мой магнит",
                fio_director: "Афанасий А.А",
                phone: '+7 (980) 663-39-93'
            },
            {
                id: 10,
                company_name: "Пятерочка",
                fio_director: "Крестьянинка А.А",
                phone: '+7 (910) 100-10-21'
            },
        ],
        item_add:
        {
            id: '',
            company_name: "",
            fio_director: "",
            phone: ""
        },
        searchFull: [],
        inputSearch: "",
        popapStatus: false,
        ButtonStatus: false,
        ClassActive: "main__table-header-title-active",
        ClassDisable: "main__table-header-title",
        SortNameClass: "main__table-header-title",
        SortDirectorClass: "main__table-header-title",
        SortDirector: 0,
        SortName: 0,
        imageUrl: "Assets/img/sort-az.png",
        currentPage: 1,
        itemsPerPage: 4,
        popapStyle: "active",
    },
    computed: {
        totalPages() {
            return Math.ceil(this.searchFull.length / this.itemsPerPage);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.searchFull.slice(startIndex, endIndex);
        }
    },
    methods: {
        load() {
            if (localStorage.getItem('data') == null) {
                this.searchFull = this.items
            }
            else {
                this.searchFull = JSON.parse(localStorage.getItem('data'))
                this.items = JSON.parse(localStorage.getItem('data'))
            }
        },

        delete_row(id) {
            const index = this.items.findIndex(item => item.id === id)
            this.items.splice(index, 1)
            this.localDataSave();
            this.searchFull = this.items
            this.search(this.inputSearch)

        },

        search(fio) {
            this.searchFull = []
            this.items.forEach((item) => {
                if (item.fio_director.toLowerCase().indexOf(fio.toLowerCase()) !== -1) {
                    this.searchFull.push(item);
                }
            })
        },
        openPopap(status) {
            this.popapStatus = status
        },
        addData() {
            const ids = this.items.map(item => item.id)
            this.maxId = Math.max(...ids)
            this.item_add.id = this.maxId + 1
            this.items.push(this.item_add)
            this.localDataSave()
            this.item_add = {}
            this.openPopap(false)
            this.search(this.inputSearch)
            this.ButtonStatus = false

        },
        localDataSave() {
            localStorage.setItem('data', JSON.stringify(this.items));
        },
        formRefresh() {
            if (this.item_add.phone != "" && this.item_add.fio_director != "" && this.item_add.company_name != "") {
                this.ButtonStatus = true;

            }
            else {
                this.ButtonStatus = false;
            }
        },
        formatPhoneNumber() {
            const cleanPhoneNumber = this.item_add.phone.replace(/\D/g, '');
            if (cleanPhoneNumber.length > 0 && cleanPhoneNumber[0] === '8') {
                this.item_add.phone = '+7' + cleanPhoneNumber.slice(1);
            }
            else {
                this.item_add.phone = cleanPhoneNumber.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
            }
        },
        sortTable(type) {
            if (type == "name") {
                this.SortDirector = 0
                if (this.SortName == 0 || this.SortName == 1) {
                    this.searchFull = this.searchFull.sort((a, b) => a.company_name.localeCompare(b.company_name))
                    this.SortName = 2
                    this.SortDirectorClass = this.ClassDisable
                    this.SortNameClass = this.ClassDisable
                }
                else {
                    this.searchFull = this.searchFull.sort((a, b) => b.company_name.localeCompare(a.company_name))
                    this.SortName = 0
                    this.SortDirectorClass = this.ClassDisable
                    this.SortNameClass = this.ClassActive
                }
            }
            else {
                this.SortName = 0
                if (this.SortDirector == 0 || this.SortDirector == 1) {
                    this.searchFull = this.searchFull.sort((a, b) => a.fio_director.localeCompare(b.fio_director))
                    this.SortDirector = 2
                    this.SortDirectorClass = this.ClassDisable
                    this.SortNameClass = this.ClassDisable
                }
                else {
                    this.searchFull = this.searchFull.sort((a, b) => b.fio_director.localeCompare(a.fio_director))
                    this.SortDirector = 0
                    this.SortDirectorClass = this.ClassActive
                    this.SortNameClass = this.ClassDisable
                }
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        convertPhoneNumber(phone) {
            // Удаляем все символы, кроме цифр
            return phone.replace(/[^\d]/g, '');
        },
    },
    beforeMount() {
        this.load()
    },
})