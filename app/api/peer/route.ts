import { peerRepository } from '@/entities/wg-peer/repository/peer-repository';
import { NextRequest, NextResponse } from 'next/server';
import { validateApiToken } from '@/shared/lib/validate-api-token';
import { getUserSession } from '@/features/user/actions/get-user-session';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search')?.trim() || '';
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;

    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: 'Ошибка - пользователь не найден' }, { status: 401 });
    }

    // 🧍 Пользователь → только свои пиры
    if (user.role !== 'ADMIN') {
      const peers = await peerRepository.getPeersByUserId(user.id, take, skip);

      return NextResponse.json(peers);
    }

    // 🧑‍💼 Админ → может фильтровать по имени/фамилии/login
    const peers = await peerRepository.getAllPeersFiltered(search, take, skip);
    return NextResponse.json(peers);
  } catch (error) {
    console.error('[API_PEER_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
