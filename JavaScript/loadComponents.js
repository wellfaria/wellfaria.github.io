document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar o header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        // Header caminho 'Aboluto'
       // Isso é mais robusto e não depende da pasta atual do HTML que está carregando o JS.
        let pathToHeader = '/components/header.html';
        // Se o arquivo js for carregado da index.html (na raiz),
        // ele precisa ir para 'components/header.html'
        if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/')) {
            pathToHeader = './components/header.html';
        }
        else if (window.location.pathname.includes('/pages/')) {
            pathToHeader = '../../components/header.html'
        }

        fetch(pathToHeader)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} ao carregar o header de ${pathToHeader}`);
                }
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;

                // ===CÓDIGO DO MENU HAMBÚRGUER ===

             // 1. Defina a função para configurar o menu
                function setupMobileMenu() {
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    const navMenu = document.getElementById('nav-menu'); // ID que adicionamos na tag <nav>

                    if (mobileMenuToggle && navMenu) { // Garante que os elementos foram encontrados
                        mobileMenuToggle.addEventListener('click', function() {
                            navMenu.classList.toggle('active');
                            mobileMenuToggle.classList.toggle('active'); // Para animar o X no hambúrguer
                        });

                        // Opcional: Fechar o menu ao clicar em um link (boa prática de UX)
                        navMenu.querySelectorAll('a').forEach(link => {
                            link.addEventListener('click', () => {
                                navMenu.classList.remove('active');
                                mobileMenuToggle.classList.remove('active');
                            });
                        });
                    } else {
                        console.warn("Elementos do menu mobile não encontrados. Verifique IDs e se header.html foi carregado corretamente.");
                    }
                }

                // 2. Chame a função setupMobileMenu APÓS o header ser inserido
                setupMobileMenu();

                // === AQUI TERMINA O CÓDIGO DO MENU HAMBÚRGUER ===   
            })
            .catch(e => console.error('Erro ao carregar o header:', e));
    }

    // Função para carregar o footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        // Lógica similar para o footer
        // Footer caminho 'Absoluto'
        let pathToFooter = '/components/footer.html';
        if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/')) {
            pathToFooter = './components/footer.html';
        } else if (window.location.pathname.includes('/pages/')) {
            pathToFooter = '../../components/footer.html';
        }


        fetch(pathToFooter)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(e => console.error('Erro ao carregar o footer:', e));
    }
    
});