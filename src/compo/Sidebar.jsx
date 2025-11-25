import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ showLedger, setShowLedger }) {
  return (
    <div className="sidebar">
      <h2>📋 할 일 목록</h2>
      {/* Todo 작성 영역 */}
      <input type="text" placeholder="할 일을 입력하세요" />
      <button>추가</button>

      <hr />

      <h2>💰 가계부</h2>
      {/* 토글 스위치 */}
      <label className="switch">
        <input type="checkbox" checked={showLedger} onChange={() => setShowLedger(!showLedger)} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default Sidebar;