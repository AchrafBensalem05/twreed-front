"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, ImageIcon, File, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { removeMedia, uploadMedia } from "@/app/actions/media"

export function FileUpload({
	defaultMedias = [],
	onChange = () => {},
	multiple = true,
	accept = "image/*,video/*",
	maxFiles = 10,
	maxSize = 10 * 1024 * 1024,
	variant = "default",
	className = "",
	disabled = false,
	showPreviews = true,
	uploadText = "Click to upload or drag and drop",
	uploadSubtext = "PNG, JPG, GIF up to 10MB",
}) {
	const [medias, setMedias] = useState(defaultMedias)
	const [uploading, setUploading] = useState(false)
	const [dragActive, setDragActive] = useState(false)
	const fileInputRef = useRef(null)

	const handleFiles = useCallback(
		async (files) => {
			if (!files || files.length === 0) return

			const fileArray = Array.from(files)

			// Validate file size
			const validFiles = fileArray.filter((file) => {
				if (file.size > maxSize) {
					return false
				}
				return true
			})

			if (validFiles.length === 0) return

			// Check max files limit
			if (medias.length + validFiles.length > maxFiles) {
				return
			}

			setUploading(true)

			try {
				const formData = new FormData()
				validFiles.forEach((file) => {
					formData.append("files[]", file)
				})

				const response = await uploadMedia(formData)
				if (response.success) {
					const newMedias = [...medias, ...response.data]
					console.log(newMedias)
					setMedias(newMedias)
					onChange(newMedias)
				} else {
				}
			} catch (error) {
				console.error("Upload error:", error)
			} finally {
				setUploading(false)
			}
		},
		[medias, onChange, maxFiles, maxSize]
	)

	const handleRemove = useCallback(
		async (mediaId) => {
			try {
				const response = await removeMedia({ id: mediaId })
				console.log(response)
				if (response.success) {
					const newMedias = medias.filter((media) => media.id !== mediaId)
					setMedias(newMedias)
					onChange(newMedias)
				} else {
				}
			} catch (error) {
				console.error("Remove error:", error)
			}
		},
		[medias, onChange]
	)

	const handleDrag = useCallback((e) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true)
		} else if (e.type === "dragleave") {
			setDragActive(false)
		}
	}, [])

	const handleDrop = useCallback(
		(e) => {
			e.preventDefault()
			e.stopPropagation()
			setDragActive(false)

			if (disabled) return

			const files = e.dataTransfer.files
			handleFiles(files)
		},
		[handleFiles, disabled]
	)

	const handleInputChange = useCallback(
		(e) => {
			const files = e.target.files
			handleFiles(files)
			// Reset input value to allow same file selection
			e.target.value = ""
		},
		[handleFiles]
	)

	const openFileDialog = useCallback(() => {
		if (!disabled) {
			fileInputRef.current?.click()
		}
	}, [disabled])

	const getFileIcon = (url) => {
		const extension = url.split(".").pop()?.toLowerCase()
		const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"]

		if (imageExtensions.includes(extension)) {
			return <ImageIcon className="w-4 h-4" />
		}
		return <File className="w-4 h-4" />
	}

	const renderUploadArea = () => {
		const baseClasses = cn(
			"border-2 border-dashed rounded-lg transition-colors cursor-pointer",
			dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
			disabled && "opacity-50 cursor-not-allowed",
			variant === "compact" && "p-4",
			variant === "default" && "p-8",
			className
		)

		return (
			<div className={baseClasses} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={openFileDialog}>
				<input ref={fileInputRef} type="file" multiple={multiple} accept={accept} onChange={handleInputChange} className="hidden" disabled={disabled} />

				<div className="flex flex-col items-center justify-center text-center">
					{uploading ? <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" /> : <Upload className="w-8 h-8 text-gray-400 mb-2" />}

					<p className="text-sm font-medium text-gray-900">{uploading ? "Uploading..." : uploadText}</p>

					{variant !== "compact" && <p className="text-xs text-gray-500 mt-1">{uploadSubtext}</p>}
				</div>
			</div>
		)
	}

	const renderPreviews = () => {
		if (!showPreviews || medias.length === 0) return null

		const gridClasses = cn("grid gap-4 mt-4", variant === "compact" ? "grid-cols-4" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6")

		return (
			<div className={gridClasses}>
				{medias.map((media) => (
					<Card key={media.id} className="relative group overflow-hidden">
						<CardContent className="p-0">
							<div className="aspect-square relative">
								{media.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
									<img src={media.url || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
								) : (
									<div className="w-full h-full flex items-center justify-center bg-gray-100">
										{getFileIcon(media.url)}
										<span className="text-xs ml-1 truncate">{media.name || "File"}</span>
									</div>
								)}

								<Button
									type="button"
									size="icon"
									variant="destructive"
									className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
									onClick={(e) => {
										e.stopPropagation()
										handleRemove(media.id)
									}}
								>
									<X className="w-3 h-3" />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		)
	}

	return (
		<div className="w-full">
			{renderUploadArea()}
			{renderPreviews()}

			{medias.length > 0 && (
				<p className="text-xs text-gray-500 mt-2">
					{medias.length} file{medias.length !== 1 ? "s" : ""} uploaded
				</p>
			)}
		</div>
	)
}
