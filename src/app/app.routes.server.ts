import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [


  //  {
  //   path: 'details/:id',
  //   renderMode: RenderMode.Prerender,
  //   // أضفنا دي
  //   async getPrerenderParams() {
  //     const res = await fetch('https://fakestoreapi.com/products');
  //     const products = await res.json();
  //     return products.map((product: any) => ({
  //       id: product.id.toString(), // لازم ترجع كـ string
  //     }));
  //   }
  // },


  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
