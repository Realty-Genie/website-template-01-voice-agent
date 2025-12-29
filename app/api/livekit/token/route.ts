import { AccessToken } from 'livekit-server-sdk'
import { NextResponse } from 'next/server'

export async function POST() {
    const apiKey = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!

    const token = new AccessToken(apiKey, apiSecret, {
        identity: `user-${crypto.randomUUID()}`,
    })

    token.addGrant({
        room: 'voice-room',
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
    })

    return NextResponse.json({ token: token.toJwt() })
}