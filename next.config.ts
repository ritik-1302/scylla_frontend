import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/seed/**'
    },
    {protocol: 'https',
      hostname: 'logo.clearbit.com',
      port: '',
      pathname: '/**'

    }
  ]
  }
  
  
};

export default nextConfig;
