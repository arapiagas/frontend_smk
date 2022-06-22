import {
    createRouter,
    createWebHistory
} from 'vue-router';
import App from './App.vue';
import App1 from './App1.vue';
import App2 from './App2.vue';

function token() {
    return localStorage.getItem('WebToken');
}

function level() {
    return localStorage.getItem('Privilage');
}

const routes = [{
        path: '/pendidik',
        name: 'app',
        component: App,
        meta: {
            AuthAdmin: true
        },
        children: [{
                path: '',
                name: 'admin_dashboard',
                component: () => import('./components/Dashboard.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/beasiswa',
                name: 'admin_beasiswa',
                component: () => import('./components/BeasiswaSekolah.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/blogpost',
                name: 'admin_blogpost',
                component: () => import('./components/Blogpost.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/ekskul',
                name: 'admin_ekskul',
                component: () => import('./components/Ekstrakurikular.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/fasilitas_sekolah',
                name: 'admin_fasilitas_sekolah',
                component: () => import('./components/FasilitasSekolah.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/album_galeri',
                name: 'admin_album_galeri',
                component: () => import('./components/AlbumFoto.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/guru_pengajar',
                name: 'admin_guru_pengajar',
                component: () => import('./components/DataGuru.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/program_studi',
                name: 'admin_program_studi',
                component: () => import('./components/ProgramStudi.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/blogspot_kategori',
                name: 'admin_blogspot_kategori',
                component: () => import('./components/Kategori.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/media_sosial',
                name: 'admin_media_sosial',
                component: () => import('./components/MediaSosial.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/menu',
                name: 'admin_menu',
                component: () => import('./components/MenuWebsite.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/menu/dropdown',
                name: 'admin_menu_dropdown',
                component: () => import('./components/Dropdown.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/daftar_prestasi',
                name: 'admin_daftar_prestasi',
                component: () => import('./components/PrestasiSiswa.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/web_profil',
                name: 'admin_web_profil',
                component: () => import('./components/ProfilWebsite.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/halaman_statis',
                name: 'admin_halaman_statis',
                component: () => import('./components/HalamanStatis.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/testimoni_user',
                name: 'admin_testimoni_user',
                component: () => import('./components/TestimoniUser.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/data_user',
                name: 'admin_data_user',
                component: () => import('./components/DataUser.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/visi_misi_sekolah',
                name: 'admin_visi_misi_sekolah',
                component: () => import('./components/VisiMisi.vue'),
                meta: {
                    AuthAdmin: true
                }
            },
            {
                path: '/pendidik/daftar_ikon',
                name: 'admin_icons',
                component: () => import('./components/ListIcon.vue'),
                meta: {
                    AuthAdmin: true
                }
            }
        ]
    },
    {
        path: '/petugas',
        name: 'petugas',
        component: App2,
        meta: {
            AuthPetugas: true
        },
        children: [{
                path: '',
                name: 'petugas_dashboard',
                component: () => import('./components/Dashboard.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/beasiswa',
                name: 'petugas_beasiswa',
                component: () => import('./components/BeasiswaSekolah.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/blogpost',
                name: 'petugas_blogpost',
                component: () => import('./components/Blogpost.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/ekskul',
                name: 'petugas_ekskul',
                component: () => import('./components/Ekstrakurikular.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/fasilitas_sekolah',
                name: 'petugas_fasilitas_sekolah',
                component: () => import('./components/FasilitasSekolah.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/album_galeri',
                name: 'petugas_album_galeri',
                component: () => import('./components/AlbumFoto.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/guru_pengajar',
                name: 'petugas_guru_pengajar',
                component: () => import('./components/DataGuru.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/program_studi',
                name: 'petugas_program_studi',
                component: () => import('./components/ProgramStudi.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/blogspot_kategori',
                name: 'petugas_blogspot_kategori',
                component: () => import('./components/Kategori.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/media_sosial',
                name: 'petugas_media_sosial',
                component: () => import('./components/MediaSosial.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/menu',
                name: 'petugas_menu',
                component: () => import('./components/MenuWebsite.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/menu/dropdown',
                name: 'petugas_menu_dropdown',
                component: () => import('./components/Dropdown.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/daftar_prestasi',
                name: 'petugas_daftar_prestasi',
                component: () => import('./components/PrestasiSiswa.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/halaman_statis',
                name: 'petugas_halaman_statis',
                component: () => import('./components/HalamanStatis.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/testimoni_user',
                name: 'petugas_testimoni_user',
                component: () => import('./components/TestimoniUser.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/visi_misi_sekolah',
                name: 'petugas_visi_misi_sekolah',
                component: () => import('./components/VisiMisi.vue'),
                meta: {
                    AuthPetugas: true
                }
            },
            {
                path: '/petugas/daftar_ikon',
                name: 'petugas_icons',
                component: () => import('./components/ListIcon.vue'),
                meta: {
                    AuthPetugas: true
                }
            }
        ]
    },
    {
        path: '/siswa',
        name: 'siswa',
        component: App1,
        meta: {
            AuthSiswa: true
        },
        children: [{
                path: '',
                name: 'siswa_dashboard',
                component: () => import('./components/Dashboard.vue'),
                meta: {
                    AuthSiswa: true
                }
            },
            {
                path: '/siswa/blogpost',
                name: 'siswa_blogpost',
                component: () => import('./components/Blogpost.vue'),
                meta: {
                    AuthSiswa: true
                }
            },
            {
                path: '/siswa/album_galeri',
                name: 'siswa_album_galeri',
                component: () => import('./components/AlbumFoto.vue'),
                meta: {
                    AuthSiswa: true
                }
            },
            {
                path: '/siswa/testimoni_user',
                name: 'siswa_testimoni_user',
                component: () => import('./components/TestimoniUser.vue'),
                meta: {
                    AuthSiswa: true
                }
            },
        ]
    },
    {
        path: '/',
        name: 'beranda',
        component: () => import('./Layout.vue'),
        meta: {
            AuthGuest: true
        },
        children: [{
                path: '/',
                name: 'landing',
                component: () => import('./pages/Beranda.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/blogpost',
                name: 'blogpost',
                component: () => import('./pages/Blogpost.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/blogpost/:slug',
                name: 'detail_blogpost',
                component: () => import('./pages/DetailBlogpost.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/kategori/:nama',
                name: 'kategori',
                component: () => import('./pages/Kategori.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/galeri',
                name: 'galeri',
                component: () => import('./pages/Galeri.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/informasi',
                name: 'informasi',
                component: () => import('./pages/Info.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/daftar_guru',
                name: 'daftar_guru',
                component: () => import('./pages/DataGuru.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/halaman/:link',
                name: 'halaman',
                component: () => import('./pages/Halaman.vue'),
                meta: {
                    AuthGuest: true
                }
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('./pages/Login.vue'),
                meta: {
                    AuthGuest: true
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.AuthAdmin)) {
        if (token() == null) {
            next({
                path: '/'
            });
        } else {
            if (level() == 'petugas') {
                next({
                    path: '/petugas'
                });
            } else if (level() == 'siswa') {
                next({
                    path: '/siswa'
                });
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.AuthPetugas)) {
        if (token() == null) {
            next({
                path: '/'
            });
        } else {
            if (level() == 'admin') {
                next({
                    path: '/pendidik'
                });
            } else if (level() == 'siswa') {
                next({
                    path: '/siswa'
                });
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.AuthSiswa)) {
        if (token() == null) {
            next({
                path: '/'
            });
        } else {
            if (level() == 'petugas') {
                next({
                    path: '/petugas'
                });
            } else if (level() == 'admin') {
                next({
                    path: '/pendidik'
                });
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.AuthGuest)) {
        if (token() == null) {
            next()
        } else {
            if (level() == 'petugas') {
                next({
                    path: '/petugas'
                });
            } else if (level() == 'admin') {
                next({
                    path: '/pendidik'
                });
            } else {
                next('/siswa')
            }
        }
    } else {
        next()
    }
});


export default router;