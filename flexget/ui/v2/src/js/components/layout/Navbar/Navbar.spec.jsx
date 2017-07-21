import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import IconButton from 'material-ui/IconButton';
import { Navbar } from 'components/layout/Navbar';
import { themed, router } from 'utils/tests';

function renderNavbar(toggle, logout) {
  return router(themed(<Navbar
    toggle={toggle}
    logout={logout}
    reloadServer={jest.fn()}
    shutdownServer={jest.fn()}
    classes={{}}
  />));
}

describe('components/layout/Navbar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      renderNavbar(jest.fn(), jest.fn())
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const logout = jest.fn();
    const wrapper = shallow(<Navbar
      toggle={toggle}
      logout={logout}
      classes={{}}
      reloadServer={jest.fn()}
      shutdownServer={jest.fn()}
    />);

    wrapper.find('.fa-bars').closest(IconButton).simulate('click');
    expect(toggle).toHaveBeenCalled();
  });

  it('calls handleMenuClick when the menu button is pressed', () => {
    const toggle = jest.fn();
    const logout = jest.fn();
    const target = { a: 'target' };
    const wrapper = shallow(<Navbar
      toggle={toggle}
      logout={logout}
      classes={{}}
      reloadServer={jest.fn()}
      shutdownServer={jest.fn()}
    />);

    const button = wrapper.find('.fa-cog').closest(IconButton);

    button.simulate('click', { currentTarget: target });
    expect(wrapper.state().menuOpen).toEqual(true);
    expect(wrapper.state().anchorEl).toEqual(target);
  });
});
