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

  const { data: a_1 } = useSWR<ResponseData>(/*        */ `/api/now?db=neon&tls=subtls&fast=no&coalesce=no&x=1`);
  const { data: a_2 } = useSWR<ResponseData>(() => a_1 && `/api/now?db=neon&tls=subtls&fast=no&coalesce=no&x=2`);
  const { data: a_3 } = useSWR<ResponseData>(() => a_2 && `/api/now?db=neon&tls=subtls&fast=no&coalesce=no&x=3`);
  const { data: a_4 } = useSWR<ResponseData>(() => a_3 && `/api/now?db=neon&tls=subtls&fast=no&coalesce=no&x=4`);
  const { data: a_5 } = useSWR<ResponseData>(() => a_4 && `/api/now?db=neon&tls=subtls&fast=no&coalesce=no&x=5`);

  const { data: b_1 } = useSWR<ResponseData>(() => a_5 && `/api/now?db=gm&tls=subtls&fast=no&coalesce=no&x=1`);
  const { data: b_2 } = useSWR<ResponseData>(() => b_1 && `/api/now?db=gm&tls=subtls&fast=no&coalesce=no&x=2`);
  const { data: b_3 } = useSWR<ResponseData>(() => b_2 && `/api/now?db=gm&tls=subtls&fast=no&coalesce=no&x=3`);
  const { data: b_4 } = useSWR<ResponseData>(() => b_3 && `/api/now?db=gm&tls=subtls&fast=no&coalesce=no&x=4`);
  const { data: b_5 } = useSWR<ResponseData>(() => b_4 && `/api/now?db=gm&tls=subtls&fast=no&coalesce=no&x=5`);

  const { data: c_1 } = useSWR<ResponseData>(() => b_5 && `/api/now?db=gm&tls=wss&fast=no&coalesce=no&x=1`);
  const { data: c_2 } = useSWR<ResponseData>(() => c_1 && `/api/now?db=gm&tls=wss&fast=no&coalesce=no&x=2`);
  const { data: c_3 } = useSWR<ResponseData>(() => c_2 && `/api/now?db=gm&tls=wss&fast=no&coalesce=no&x=3`);
  const { data: c_4 } = useSWR<ResponseData>(() => c_3 && `/api/now?db=gm&tls=wss&fast=no&coalesce=no&x=4`);
  const { data: c_5 } = useSWR<ResponseData>(() => c_4 && `/api/now?db=gm&tls=wss&fast=no&coalesce=no&x=5`);

  const { data: d_1 } = useSWR<ResponseData>(() => c_5 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=1`);
  const { data: d_2 } = useSWR<ResponseData>(() => d_1 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=2`);
  const { data: d_3 } = useSWR<ResponseData>(() => d_2 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=3`);
  const { data: d_4 } = useSWR<ResponseData>(() => d_3 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=4`);
  const { data: d_5 } = useSWR<ResponseData>(() => d_4 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=no&x=5`);

  const { data: e_1 } = useSWR<ResponseData>(() => d_5 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=1`);
  const { data: e_2 } = useSWR<ResponseData>(() => e_1 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=2`);
  const { data: e_3 } = useSWR<ResponseData>(() => e_2 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=3`);
  const { data: e_4 } = useSWR<ResponseData>(() => e_3 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=4`);
  const { data: e_5 } = useSWR<ResponseData>(() => e_4 && `/api/now?db=gm&tls=wss&fast=yes&coalesce=yes&x=5`);

  return <>
    <h2>Timings</h2>
    <ul>
      <li>
        Ordinary WebSocket (ws://) + <a href="https://github.com/jawj/subtls">subtls</a> to separate proxy and Neon DB:<br />
        {a_1?.duration ?? '...'} ms, {' '}
        {a_2?.duration ?? '...'} ms, {' '}
        {a_3?.duration ?? '...'} ms, {' '}
        {a_4?.duration ?? '...'} ms, {' '}
        {a_5?.duration ?? '...'} ms {' '}
      </li>
      <li>
        Ordinary WebSocket (ws://) + <a href="https://github.com/jawj/subtls">subtls</a> to co-located proxy and DB:<br />
        {b_1?.duration ?? '...'} ms, {' '}
        {b_2?.duration ?? '...'} ms, {' '}
        {b_3?.duration ?? '...'} ms, {' '}
        {b_4?.duration ?? '...'} ms, {' '}
        {b_5?.duration ?? '...'} ms  {' '}
      </li>
      <li>
        Secure WebSocket (wss://) to co-located proxy and DB:<br />
        {c_1?.duration ?? '...'} ms, {' '}
        {c_2?.duration ?? '...'} ms, {' '}
        {c_3?.duration ?? '...'} ms, {' '}
        {c_4?.duration ?? '...'} ms, {' '}
        {c_5?.duration ?? '...'} ms  {' '}
      </li>
      <li>
        Secure WebSocket (wss://) to co-located proxy and DB, pipelined:<br />
        {d_1?.duration ?? '...'} ms, {' '}
        {d_2?.duration ?? '...'} ms, {' '}
        {d_3?.duration ?? '...'} ms, {' '}
        {d_4?.duration ?? '...'} ms, {' '}
        {d_5?.duration ?? '...'} ms  {' '}
      </li>
      <li>
        Secure WebSocket (wss://) to co-located proxy and DB, pipelined, coalesced writes:<br />
        {e_1?.duration ?? '...'} ms, {' '}
        {e_2?.duration ?? '...'} ms, {' '}
        {e_3?.duration ?? '...'} ms, {' '}
        {e_4?.duration ?? '...'} ms, {' '}
        {e_5?.duration ?? '...'} ms  {' '}
      </li>
    </ul>
  </>;
}

