import formatAdvise from './format-advise'

const msgId = '[iframe-resizer]'

let settings = {}
let logEnabled = false

export function setLogEnabled(enabled) {
  logEnabled = enabled
}

export function setLogSettings(newSettings) {
  settings = newSettings
}

const isLogEnabled = (iframeId) =>
  settings[iframeId] ? settings[iframeId].log : logEnabled

function getMyID(iframeId) {
  if (window.top === window.self) {
    return `Parent page: ${iframeId}`
  }

  return window?.parentIFrame?.getId
    ? `${window.parentIFrame.getId()}: ${iframeId}`
    : `Nested parent page: ${iframeId}`
}

const formatLogHeader = (iframeId) => `${msgId}[${getMyID(iframeId)}]`

const formatLogMsg =
  (iframeId) =>
  (...msg) =>
    [`${msgId}[${iframeId}]`, ...msg].join(' ')

const output = (type, iframeId, ...msg) =>
  // eslint-disable-next-line no-console
  window?.console[type](formatLogHeader(iframeId), ...msg)

export const log = (iframeId, ...msg) =>
  isLogEnabled(iframeId) === true ? output('log', iframeId, ...msg) : null

export const info = (iframeId, ...msg) => output('info', iframeId, ...msg)

export const warn = (iframeId, ...msg) => output('warn', iframeId, ...msg)

export const advise = (iframeId, msg) =>
  // eslint-disable-next-line no-console
  console?.warn(formatAdvise(formatLogMsg(iframeId))(msg))
