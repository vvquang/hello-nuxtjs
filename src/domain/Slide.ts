/* eslint camelcase: 0 */
export type Slide = {
  id: number
  content: String
}

export type ResponseJson = {
  id: number
  content: string
}

export const fromJson = ({ id, content }: ResponseJson): Slide => ({
  id,
  content,
})
