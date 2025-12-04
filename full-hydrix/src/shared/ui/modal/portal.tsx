import { useState, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import type { PortalProps } from "./setting/type"

const PortalModal = ({ children, wrapperId }: PortalProps) => {
	const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLElement
		let portalCreated = false
		if (!element) {
			element = createWrapperAndAppendToBody(wrapperId)
			portalCreated = true
		}

		setPortalElement(element)
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'unset'

			if (portalCreated && element.parentNode) {
				element.parentNode.removeChild(element)
			}
		}
	}, [wrapperId])

	const createWrapperAndAppendToBody = (elementId: string) => {
		const element = document.createElement("div")
		element.setAttribute("id", elementId)
		document.body.appendChild(element)
		return element
	}

	if (!portalElement) return null

	return createPortal(children, portalElement)
}

export default PortalModal