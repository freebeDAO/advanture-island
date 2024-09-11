/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    MYSQL_HOST: "localhost",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "land_panel",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "my-secret-word",
  },
  experimental: {
  },
};

export default nextConfig;
