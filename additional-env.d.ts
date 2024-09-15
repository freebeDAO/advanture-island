declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            NEXT_PUBLIC_W3C_PID: string
        }
    }
}

export {}
