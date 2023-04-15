// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    response?: any;
    error?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Check that request method is POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    // get pinCode and data from req
    const { pinCode, data } = req.body;
    if (!pinCode || !data) {
        res.status(400).json({ error: 'Missing pinCode or data' });
        return;
    }

    let value = data;
    // if data is json, stringify it
    if (typeof data === 'object') {
        value = JSON.stringify(data);
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic ZDJsdWJtbHVaeTFqYUdsd2JYVnVheTB4TXpJNE5pUnU2Q20zQTlNb19RNm1UaFJEXzdzMHpxZ09vM1Q3cElFOjlmMTBjOTJlNTNmZjRlOTZiYWFmZGFkYmMyYzljNmZl'
        },
        body: JSON.stringify({
            key: pinCode,
            value
        })
    };
    const ret = await fetch(
        'https://winning-chipmunk-13286-us1-rest-kafka.upstash.io/produce/Gestures',
        options
    );
    const out = await ret.json();

    res.status(200).json({ response: out });
}
