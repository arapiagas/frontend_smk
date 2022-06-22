export default class LinkDashboard {




    siswa = [{
            label: 'Dashboard',
            items: [{
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/pendidik'
            }]
        },
        {
            label: 'Media',
            items: [{
                    label: 'Blogpost',
                    icon: 'pi pi-fw pi-th-large',
                    to: '/pendidik/blogpost'
                },
                {
                    label: 'Album foto',
                    icon: 'pi pi-fw pi-image',
                    to: '/pendidik/album_galeri'
                },
            ]
        }
    ]
}