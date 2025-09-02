import { provideLottieOptions } from 'ngx-lottie';

export const appConfig = {
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
};
