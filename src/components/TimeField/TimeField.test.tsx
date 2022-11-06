import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { TimeField } from './TimeField';

const onChange = vi.fn((date: Date) => date);
function renderField(initialValue = new Date('2022-11-11T10:30:00.000Z')) {
  render(<TimeField value={initialValue} onChange={onChange} />);
}
beforeEach(() => {
  onChange.mockReset();
});

afterEach(cleanup);

test('時間フィールドのArrowUpキー押下で時間を1時間増加させる', () => {
  renderField();
  fireEvent.keyDown(screen.getByLabelText('時'), {
    key: 'ArrowUp',
  });
  expect(onChange.mock.calls[0][0].getHours()).toBe(11);
});

test('時間フィールドのArrowUpキー押下時、23時の場合は同日の0時に折り返す', () => {
  renderField(new Date('2022-11-11T23:30:00.000Z'));
  fireEvent.keyDown(screen.getByLabelText('時'), {
    key: 'ArrowUp',
  });
  expect(onChange.mock.calls[0][0].getHours()).toBe(0);
  expect(onChange.mock.calls[0][0].getDate()).toBe(11);
});

test('時間フィールドのArrowDownキー押下で時間を1時間減少させる', () => {
  renderField();
  fireEvent.keyDown(screen.getByLabelText('時'), {
    key: 'ArrowDown',
  });
  expect(onChange.mock.calls[0][0].getHours()).toBe(9);
});

test('時間フィールドのArrowDownキー押下時、0時の場合は同日の23時に折り返す', () => {
  renderField(new Date('2022-11-11T00:30:00.000Z'));
  fireEvent.keyDown(screen.getByLabelText('時'), {
    key: 'ArrowDown',
  });
  expect(onChange.mock.calls[0][0].getHours()).toBe(23);
  expect(onChange.mock.calls[0][0].getDate()).toBe(11);
});

test('分フィールドのArrowUpキー押下で時間を1分増加させる', () => {
  renderField();
  fireEvent.keyDown(screen.getByLabelText('分'), {
    key: 'ArrowUp',
  });
  expect(onChange.mock.calls[0][0].getMinutes()).toBe(31);
});

test('分フィールドのArrowUpキー押下時、59分の場合は同時間の0分に折り返す', () => {
  renderField(new Date('2022-11-11T10:59:00.000Z'));
  fireEvent.keyDown(screen.getByLabelText('分'), {
    key: 'ArrowUp',
  });
  expect(onChange.mock.calls[0][0].getMinutes()).toBe(0);
  expect(onChange.mock.calls[0][0].getHours()).toBe(10);
});

test('分フィールドのArrowDownキー押下で時間を1分減少させる', () => {
  renderField();
  fireEvent.keyDown(screen.getByLabelText('分'), {
    key: 'ArrowDown',
  });
  expect(onChange.mock.calls[0][0].getMinutes()).toBe(29);
});

test('分フィールドのArrowDownキー押下時、0分の場合は同時間の59分に折り返す', () => {
  renderField(new Date('2022-11-11T10:00:00.000Z'));
  fireEvent.keyDown(screen.getByLabelText('分'), {
    key: 'ArrowDown',
  });
  expect(onChange.mock.calls[0][0].getMinutes()).toBe(59);
  expect(onChange.mock.calls[0][0].getHours()).toBe(10);
});

type Case = [now: number, input: number, expected: number];
describe('時間フィールドの数値入力時', () => {
  const cases: Case[] = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 2, 2],
    [0, 3, 3],
    [0, 4, 4],
    [0, 5, 5],
    [1, 0, 10],
    [1, 1, 11],
    [2, 0, 20],
    [2, 1, 21],
    [2, 4, 4],
    [3, 0, 0],
    [3, 1, 1],
    [10, 0, 0],
    [10, 1, 1],
    [11, 0, 10],
    [11, 1, 11],
    [11, 2, 12],
    [12, 0, 20],
    [12, 1, 21],
    [12, 5, 5],
    [13, 0, 0],
    [13, 1, 1],
    [20, 0, 0],
    [20, 1, 1],
    [21, 0, 10],
    [21, 1, 11],
    [21, 2, 12],
    [22, 0, 20],
    [22, 1, 21],
    [23, 0, 0],
    [23, 1, 1],
  ];

  cases.forEach(([now, input, expected]) => {
    test(`${now}時に${input}を入力すると${expected}時になる`, () => {
      renderField(
        new Date(`2022-11-11T${String(now).padStart(2, '0')}:00:00.000Z`),
      );
      fireEvent.keyDown(screen.getByLabelText('時'), {
        key: input.toString(),
      });
      expect(onChange.mock.calls[0][0].getHours()).toBe(expected);
    });
  });
});

describe('分フィールドの数値入力時', () => {
  const cases: Case[] = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 10],
    [1, 1, 11],
    [2, 0, 20],
    [2, 1, 21],
    [5, 0, 50],
    [6, 0, 0],
    [6, 1, 1],
    [7, 0, 0],
    [9, 0, 0],
    [10, 0, 0],
    [11, 0, 10],
    [11, 1, 11],
    [12, 0, 20],
    [12, 1, 21],
    [16, 0, 0],
  ];

  cases.forEach(([now, input, expected]) => {
    test(`${now}分に${input}を入力すると${expected}分になる`, () => {
      renderField(
        new Date(`2022-11-11T11:${String(now).padStart(2, '0')}:00.000Z`),
      );
      fireEvent.keyDown(screen.getByLabelText('分'), {
        key: input.toString(),
      });
      expect(onChange.mock.calls[0][0].getMinutes()).toBe(expected);
    });
  });
});

describe('Backspace入力', () => {
  describe('時間フィールド', () => {
    const cases: [now: number, expected: number][] = [
      [0, 0],
      [1, 0],
      [10, 1],
      [15, 1],
      [20, 2],
    ];
    cases.forEach(([now, expected]) => {
      test(`${now}時の時間フィールドでBackspace入力で${expected}時になる`, () => {
        renderField(
          new Date(`2022-11-11T${now.toString().padStart(2, '0')}:00:00.000Z`),
        );
        fireEvent.keyDown(screen.getByLabelText('時'), {
          key: 'Backspace',
        });
        expect(onChange.mock.calls[0][0].getHours()).toBe(expected);
      });
    });
  });

  describe('分フィールド', () => {
    const cases: [now: number, expected: number][] = [
      [0, 0],
      [1, 0],
      [10, 1],
      [15, 1],
      [35, 3],
      [52, 5],
    ];
    cases.forEach(([now, expected]) => {
      test(`${now}分の時間フィールドでBackspace入力で${expected}分になる`, () => {
        renderField(
          new Date(`2022-11-11T00:${now.toString().padStart(2, '0')}:00.000Z`),
        );
        fireEvent.keyDown(screen.getByLabelText('分'), {
          key: 'Backspace',
        });
        expect(onChange.mock.calls[0][0].getMinutes()).toBe(expected);
      });
    });
  });
});

describe('BaseDateが渡されているケース', () => {
  test('時間フィールドのArrowUpキー押下時、23時の場合は翌日の0時にセットされる', () => {
    render(
      <TimeField
        value={new Date('2022-11-11T23:30:00.000Z')}
        onChange={onChange}
        over24BaseDate={new Date('2022-11-11T23:00:00.000Z')}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText('時'), {
      key: 'ArrowUp',
    });
    expect(onChange.mock.calls[0][0].getHours()).toBe(0);
    expect(onChange.mock.calls[0][0].getDate()).toBe(12);
  });

  test('翌日以降の時間を24を超えて表記される', () => {
    render(
      <TimeField
        value={new Date('2022-11-12T03:30:00.000Z')}
        onChange={onChange}
        over24BaseDate={new Date('2022-11-11T23:00:00.000Z')}
      />,
    );
    expect(screen.getByLabelText('時').textContent).toBe('27');
  });

  test('分フィールドのArrowUpキー押下時、59分の場合は同時間の0分に折り返す挙動は、BaseDateの有無によらず挙動に変化はない', () => {
    render(
      <TimeField
        value={new Date('2022-11-11T10:59:00.000Z')}
        onChange={onChange}
        over24BaseDate={new Date('2022-11-11T23:00:00.000Z')}
      />,
    );
    fireEvent.keyDown(screen.getByLabelText('分'), {
      key: 'ArrowUp',
    });
    expect(onChange.mock.calls[0][0].getMinutes()).toBe(0);
    expect(onChange.mock.calls[0][0].getHours()).toBe(10);
  });

  test('分フィールドのArrowDownキー押下時、0分の場合は同時間の59分に折り返す挙動は、BaseDateの有無によらず挙動に変化はない', () => {
    render(
      <TimeField
        value={new Date('2022-11-11T10:00:00.000Z')}
        onChange={onChange}
        over24BaseDate={new Date('2022-11-11T23:00:00.000Z')}
      />,
    );
    fireEvent.keyDown(screen.getByLabelText('分'), {
      key: 'ArrowDown',
    });
    expect(onChange.mock.calls[0][0].getMinutes()).toBe(59);
    expect(onChange.mock.calls[0][0].getHours()).toBe(10);
  });

  describe('時間フィールドの数値入力時', () => {
    const cases: Case[] = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [0, 3, 3],
      [0, 4, 4],
      [0, 5, 5],
      [1, 0, 10],
      [1, 1, 11],
      [2, 0, 20],
      [2, 1, 21],
      [2, 4, 24],
      [3, 0, 30],
      [3, 1, 31],
      [10, 0, 100],
      [10, 1, 101],
    ];

    cases.forEach(([now, input, expected]) => {
      test(`${now}時に${input}を入力すると${expected}時になる`, () => {
        render(
          <TimeField
            value={
              new Date(`2022-11-11T${String(now).padStart(2, '0')}:00:00.000Z`)
            }
            onChange={onChange}
            over24BaseDate={new Date('2022-11-11T00:00:00.000Z')}
          />,
        );
        fireEvent.keyDown(screen.getByLabelText('時'), {
          key: input.toString(),
        });

        expect(onChange.mock.calls[0][0].getDate()).toBe(
          11 + Math.floor(expected / 24),
        );
        expect(onChange.mock.calls[0][0].getHours()).toBe(expected % 24);
      });
    });
  });

  describe('時間フィールドにBackspace入力時、1の位を削除した値になる', () => {
    const cases: [now: number, expected: number][] = [
      [123, 12],
      [12, 1],
      [1, 0],
      [25, 2],
      [36, 3],
    ];
    cases.forEach(([now, expected]) => {
      test(`${now}時のときにBackspace入力で${expected}時になる`, () => {
        render(
          <TimeField
            value={
              new Date(
                `2022-11-${11 + Math.floor(now / 24)}T${String(
                  now % 24,
                ).padStart(2, '0')}:00:00.000Z`,
              )
            }
            onChange={onChange}
            over24BaseDate={new Date('2022-11-11T00:00:00.000Z')}
          />,
        );
        fireEvent.keyDown(screen.getByLabelText('時'), {
          key: 'Backspace',
        });
        expect(onChange.mock.calls[0][0].getHours()).toBe(expected);
        expect(onChange.mock.calls[0][0].getDate()).toBe(
          11 + Math.floor(expected / 24),
        );
      });
    });
  });
});
