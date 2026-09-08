/**
 * Health check controller.
 * Verifies that the API service is active and responsive.
 */
export function getHealth(req, res) {
  res.status(200).json({
    success: true,
    message: 'InstaSave API is running',
  });
}
