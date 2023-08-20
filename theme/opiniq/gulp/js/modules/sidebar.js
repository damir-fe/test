export default class Sidebar {
    constructor(triggers, overlay, sidebar, sidebarLink) {
        // получаем все элементы
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.sidebar = document.querySelector(sidebar);
        this.sidebarLink = document.querySelectorAll(sidebarLink);
    }

    // клик по кнопке
    bindTrigger() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.btns.forEach(btn => {
                    btn.classList.toggle('open');
                })
                this.sidebar.classList.toggle('show');
                this.overlay.classList.toggle('show');
                document.body.classList.toggle('sidebar-opened')
            })
        })
    }

    // клик по оверлэю
    bindOverlayClick() {
        this.overlay.addEventListener('click', () => {
            this.btns.forEach(btn => {
                btn.classList.toggle('open');
            })
            this.sidebar.classList.toggle('show');
            this.overlay.classList.toggle('show');
            document.body.classList.toggle('sidebar-opened');
        })
    }

    // клик по ссылке в меню
    bindLinkClick() {
        this.sidebarLink.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.sidebar.classList.toggle('show');
                this.overlay.classList.toggle('show');
                document.querySelector('body').classList.toggle('sidebar-opened');
                this.btns.forEach(btn => {
                    btn.classList.toggle('open');
                })
                let id = link.href.slice(link.href.lastIndexOf('#') + 1)
                let headerOffset;
                if (window.innerWidth > 575) {
                    headerOffset = 131.66;
                } else if (window.innerWidth <= 575) {
                    headerOffset = 64.41;
                }
                const elementPosition = document.getElementById(`${id}`).getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            })
        })
    }
    
    swipeToggle(buttons, sidebar, overlay) {
        let touchstartX = 0
        let touchendX = 0

        function checkDirection() {
            if (touchendX < touchstartX) {
                buttons.forEach(btn => {
                    btn.classList.toggle('open');
                })
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
                document.body.classList.toggle('sidebar-opened');
            }
        }

        sidebar.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX
        })
        sidebar.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX
            checkDirection()
        })

        overlay.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX
        })
        overlay.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX
            checkDirection()
        })
    }

    init() {
        this.bindTrigger();
        this.bindOverlayClick();
        this.bindLinkClick();
        this.swipeToggle(this.btns, this.sidebar, this.overlay);
    }
}