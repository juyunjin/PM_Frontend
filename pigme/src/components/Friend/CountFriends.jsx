import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { friendRequestsState, userState } from '../../recoil/atoms';
import { Block, Text } from '../../styles/UI';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

export default function CountFriends({ requestCount }) {
  const userData = useRecoilValue(userState);
  const friendRequests = useRecoilValue(friendRequestsState);
  const navigate = useNavigate();

  // 현재 사용자가 받은 친구 요청
  const pendingFriends = friendRequests.filter(
    (request) =>
      request.friendReceiverId === userData.userId &&
      request.status === 'pending'
  );

  useEffect(() => {
    console.log(userData.userId);
    console.log('받은 친구 요청 목록:', friendRequests);

    // 현재 사용자의 친구 요청 목록
    const userPendingRequests = friendRequests.filter(
      (request) =>
        request.friendReceiverId === userData.userId &&
        request.status === 'pending'
    );
    console.log('현재 사용자의 친구 요청 목록:', userPendingRequests);

    // userPendingRequests 배열이 비어 있지 않은 경우에만 접근
    if (userPendingRequests.length == 0) {
      userPendingRequests.forEach((request) => {
        console.log('friendSenderId:', request.friendSenderId);
      });
    } else {
      console.log('받은 친구 요청이 없습니다.');
    }

    const receivedRequestsCount = userPendingRequests.length;
    console.log('받은 친구 요청 개수:', receivedRequestsCount);
  }, [friendRequests, userData]);

  return (
    <AnotherWrapper onClick={() => navigate('/friendList')}>
      <Text.Body1 pointer color="black" weight="bold">
        {requestCount}개
      </Text.Body1>
      <Text.Body1 pointer weight="bold">
        의 친구 요청
      </Text.Body1>
    </AnotherWrapper>
  );
}

const AnotherWrapper = styled(Block.FlexBox)`
  white-space: nowrap;
`;
