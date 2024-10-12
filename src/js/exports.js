// JS Exports

/**
 * Open Side Panel Callback
 * @function openSidePanel
 * @param {MouseEvent} [event]
 */
export function openSidePanel(event) {
    console.debug('openSidePanel:', event)
    if (chrome.sidePanel) {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            // noinspection JSIgnoredPromiseFromCall
            chrome.sidePanel.open({ windowId: tab.windowId })
        })
    } else if (chrome.sidebarAction) {
        // noinspection JSUnresolvedReference
        chrome.sidebarAction.open()
    } else {
        console.log('Side Panel Not Supported')
        if (event) {
            return
        }
    }
    if (event) {
        window.close()
    }
}

/**
 * Open Extension Panel
 * @function openExtPanel
 * @param {String} [url]
 * @param {Number} [width]
 * @param {Number} [height]
 * @return {Promise<chrome.windows.Window>}
 */
export async function openExtPanel(
    url = '/html/popup.html',
    width = 0,
    height = 0
) {
    // let size = localStorage.getItem('panel-size')?.split('x')
    // let size = await sendOffscreen('storage', { key: 'panel-size' })
    let size = await localStorageFn('panel-size')
    console.debug('size:', size)
    size = size?.split('x') || [0, 0]
    console.debug('size:', size)
    width = parseInt(width || size[0] || 340)
    height = parseInt(height || size[1] || 600)
    console.debug(`openExtPanel: ${url}`, width, height)
    const windows = await chrome.windows.getAll({ populate: true })
    // console.debug('windows:', windows)
    for (const window of windows) {
        // console.debug('window:', window)
        if (window.tabs[0]?.url?.endsWith(url)) {
            console.debug(`%c Panel found: ${window.id}`, 'color: Lime')
            return chrome.windows.update(window.id, { focused: true })
        }
    }
    return chrome.windows.create({ type: 'panel', url, width, height })
}

/**
 * Show Bootstrap Toast
 * @function showToast
 * @param {String} message
 * @param {String} type
 */
export function showToast(message, type = 'success') {
    console.debug(`showToast: ${type}: ${message}`)
    const clone = document.querySelector('.d-none .toast')
    const container = document.getElementById('toast-container')
    if (clone && container) {
        const element = clone.cloneNode(true)
        element.querySelector('.toast-body').innerHTML = message
        element.classList.add(`text-bg-${type}`)
        container.appendChild(element)
        const toast = new bootstrap.Toast(element)
        element.addEventListener('mousemove', () => toast.hide())
        toast.show()
    } else {
        console.info('Missing clone or container:', clone, container)
    }
}

/**
 * DeBounce Function
 * @function debounce
 * @param {Function} fn
 * @param {Number} timeout
 */
export function debounce(fn, timeout = 250) {
    let timeoutID
    return (...args) => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => fn(...args), timeout)
    }
}

/**
 *
 * @param {String} type
 * @param {Object} [data]
 * @return {Promise<Any>}
 */
export async function sendOffscreen(type, data = {}) {
    await chrome.offscreen.createDocument({
        url: 'html/offscreen.html',
        reasons: [chrome.offscreen.Reason.LOCAL_STORAGE],
        justification: 'Access local storage.',
    })
    const message = { target: 'offscreen', type, data }
    // noinspection JSIgnoredPromiseFromCall
    return chrome.runtime.sendMessage(message)
}

/**
 * @function localStorageFn
 * @param {String} key
 * @param {String} [value]
 * @return {Promise<String>}
 */
export async function localStorageFn(key, value) {
    console.debug(`localStorageFn: ${key}`, value)
    if (typeof localStorage !== 'undefined') {
        console.debug('%c Firefox: localStorage', 'color: Orange')
        if (value) {
            localStorage.setItem(key, value)
        }
        return localStorage.getItem(key)
    } else if (chrome.offscreen) {
        console.debug('%c Chrome: offscreen', 'color: DodgerBlue')
        if (value) {
            await sendOffscreen('storage', { key, value })
        }
        return sendOffscreen('storage', { key })
    }
}
