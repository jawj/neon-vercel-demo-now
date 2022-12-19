import Head from 'next/head';
import useSWR, { SWRConfig } from 'swr';
import type { ResponseData } from './api/now';

export default function Home() {
  return (
    <SWRConfig value={{
      fetcher: (url: string) => fetch(url).then(res => res.json()),
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }}>
      <div>
        <Head>
          <title>SELECT now(); query timings</title>
          <meta name="viewport" content="initial-scale=.55"></meta>
        </Head>
        <Timings />
      </div>
    </SWRConfig>
  )
}

function Timings() {
  // some dubious copy-and-paste coding here, but useSWR does hate to be called in a loop ...

  const { data: a1 } = useSWR<ResponseData>(/*        */ `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=1`);
  const { data: a2 } = useSWR<ResponseData>(() => a1 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=2`);
  const { data: a3 } = useSWR<ResponseData>(() => a2 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=3`);
  const { data: a4 } = useSWR<ResponseData>(() => a3 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=4`);
  const { data: a5 } = useSWR<ResponseData>(() => a4 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=5`);
  const { data: a6 } = useSWR<ResponseData>(() => a5 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=6`);
  const { data: a7 } = useSWR<ResponseData>(() => a6 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=7`);
  const { data: a8 } = useSWR<ResponseData>(() => a7 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=8`);
  const { data: a9 } = useSWR<ResponseData>(() => a8 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=9`);
  const { data: aa } = useSWR<ResponseData>(() => a9 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=a`);
  const { data: ab } = useSWR<ResponseData>(() => aa && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=b`);
  const { data: ac } = useSWR<ResponseData>(() => ab && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=c`);
  const { data: ad } = useSWR<ResponseData>(() => ac && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=d`);
  const { data: ae } = useSWR<ResponseData>(() => ad && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=e`);
  const { data: af } = useSWR<ResponseData>(() => ae && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=f`);

  const { data: b1 } = useSWR<ResponseData>(() => af && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=1`);
  const { data: b2 } = useSWR<ResponseData>(() => b1 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=2`);
  const { data: b3 } = useSWR<ResponseData>(() => b2 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=3`);
  const { data: b4 } = useSWR<ResponseData>(() => b3 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=4`);
  const { data: b5 } = useSWR<ResponseData>(() => b4 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=5`);
  const { data: b6 } = useSWR<ResponseData>(() => b5 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=6`);
  const { data: b7 } = useSWR<ResponseData>(() => b6 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=7`);
  const { data: b8 } = useSWR<ResponseData>(() => b7 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=8`);
  const { data: b9 } = useSWR<ResponseData>(() => b8 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=9`);
  const { data: ba } = useSWR<ResponseData>(() => b9 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=a`);
  const { data: bb } = useSWR<ResponseData>(() => ba && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=b`);
  const { data: bc } = useSWR<ResponseData>(() => bb && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=c`);
  const { data: bd } = useSWR<ResponseData>(() => bc && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=d`);
  const { data: be } = useSWR<ResponseData>(() => bd && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=e`);
  const { data: bf } = useSWR<ResponseData>(() => be && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=f`);


  function durations(...rs: (ResponseData | undefined)[]) {
    return rs
      .sort((a, b) => (a?.duration ?? 0) - (b?.duration ?? 0))
      .map((r, i) => <span key={i} style={{ fontWeight: i === 7 ? 'bold' : 'normal' }}>
        {r?.duration ?? '...'} ms &nbsp; {' '}
      </span>)
  }

  return <>
    <h2>Timings: single <code>SELECT now();</code> — 15 trials</h2>
    <ul>
      <li>
        Secure WebSocket (wss://) to co-located proxy and DB, pipelined:<br />
        {durations(a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af)}
      </li>
      <li>
        Secure WebSocket (wss://) to co-located proxy and DB, pipelined, coalesced writes:<br />
        {durations(b1, b2, b3, b4, b5, b6, b7, b8, b9, ba, bb, bc, bd, be, bf)}
      </li>
    </ul>
  </>;
}

