
import PropTypes from 'prop-types';

import {  Table, styled, Dialog, TableRow,  TableBody, TableCell, TableHead, DialogContent, tableCellClasses } from '@mui/material';

import AwardsDialogFooter from './Award_Footer';
import AwardsDialogHeader from './Awards_Header';

const AwardsDialog = ({ open, onClose, studentName, awardsData }) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#FFFFFF',
          color: "rgb(51, 51, 51, 0.5)",
        },
        [`&.${tableCellClasses.body}`]: {
          paddingTop:'8px',
          paddingBottom:'8px',
          fontFamily:'Public Sans',
          fontWeight: 'bold',
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <AwardsDialogHeader studentName={studentName} />
      <DialogContent>
                <Table>
                <TableHead >
                    <TableRow>
                    <StyledTableCell>Distance</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Earned</StyledTableCell>
                    <StyledTableCell>Awarded</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>                
                    {awardsData.map((row) => (
                        <StyledTableRow key={row.id}>
                        <StyledTableCell>
                            {row.distance}
                        </StyledTableCell>
                        <StyledTableCell>
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell>
                            {row.earnd}
                        </StyledTableCell>
                        <StyledTableCell>
                            {row.awarded}             
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>      
                </Table>   
      </DialogContent>
      <AwardsDialogFooter onClose={onClose} />
    </Dialog>
  );
};

AwardsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  studentName: PropTypes.string.isRequired,
  awardsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      // Add other PropTypes for award details as needed
    })
  ).isRequired,
};

export default AwardsDialog;